import Redis from 'ioredis';

/**
 * High-performance Redis Cache layer for DJ Mantu Portfolio
 * Features:
 * - Distributed Redis caching via `ioredis`
 * - Resilient automatic in-memory fallback if Redis is unreachable or unconfigured
 * - Global singleton preservation across Next.js development hot-reloads
 * - Zero unhandled rejections or slow hangs
 */

interface CacheEntry<T = unknown> {
  value: T;
  expiry: number | null; // Unix timestamp in ms or null for permanent
}

interface RedisGlobalState {
  redisClient?: Redis | null;
  memoryFallback?: Map<string, CacheEntry>;
  hasLoggedOfflineWarning?: boolean;
}

const globalForRedis = globalThis as unknown as RedisGlobalState;

// In-memory fallback map (preserved across hot reloads)
const memoryStore = globalForRedis.memoryFallback || new Map<string, CacheEntry>();
globalForRedis.memoryFallback = memoryStore;

function createRedisClient(): Redis | null {
  const redisUrl = process.env.REDIS_URL || 'redis://127.0.0.1:6379';

  try {
    const client = new Redis(redisUrl, {
      lazyConnect: true,
      enableOfflineQueue: false,
      maxRetriesPerRequest: 1,
      connectTimeout: 2500,
      retryStrategy(times) {
        if (times > 3) {
          return null; // Stop reconnecting after 3 attempts
        }
        return Math.min(times * 500, 2000);
      },
    });

    client.on('connect', () => {
      console.log('⚡ [Redis] Connecting to Redis server at', redisUrl);
    });

    client.on('ready', () => {
      console.log('⚡ [Redis] Client ready and active');
    });

    client.on('error', (err: unknown) => {
      if (!globalForRedis.hasLoggedOfflineWarning) {
        const errorMsg = err instanceof Error ? err.message : String(err);
        console.warn(
          `⚠️ [Redis] Connection notice: Redis server is not reachable at ${redisUrl}. Falling back to high-speed in-memory caching. (Notice: ${errorMsg})`
        );
        globalForRedis.hasLoggedOfflineWarning = true;
      }
    });

    // Attempt non-blocking connection
    client.connect().catch(() => {
      // Handled by 'error' listener
    });

    return client;
  } catch (error) {
    if (!globalForRedis.hasLoggedOfflineWarning) {
      console.warn('⚠️ [Redis] Client initialization notice: Using in-memory fallback cache.', error);
      globalForRedis.hasLoggedOfflineWarning = true;
    }
    return null;
  }
}

export function getRedisClient(): Redis | null {
  if (globalForRedis.redisClient === undefined) {
    globalForRedis.redisClient = createRedisClient();
  }
  return globalForRedis.redisClient;
}

export function isRedisReady(): boolean {
  const client = getRedisClient();
  return client !== null && client.status === 'ready';
}

/**
 * Clean expired entries from in-memory fallback
 */
function cleanupMemoryCache() {
  const now = Date.now();
  for (const [key, entry] of memoryStore.entries()) {
    if (entry.expiry !== null && entry.expiry < now) {
      memoryStore.delete(key);
    }
  }
}

/**
 * Get value from Redis or Memory Fallback
 */
export async function cacheGet<T>(key: string): Promise<T | null> {
  const client = getRedisClient();

  // 1. Try Redis if connected and ready
  if (client && client.status === 'ready') {
    try {
      const data = await client.get(key);
      if (data !== null) {
        return JSON.parse(data) as T;
      }
    } catch {
      // On Redis failure, seamlessly fall through to memory fallback
    }
  }

  // 2. Memory Fallback
  const entry = memoryStore.get(key);
  if (entry) {
    if (entry.expiry !== null && entry.expiry < Date.now()) {
      memoryStore.delete(key);
      return null;
    }
    return entry.value as T;
  }

  return null;
}

/**
 * Set value into Redis and Memory Fallback with optional TTL in seconds
 */
export async function cacheSet<T>(key: string, value: T, ttlSeconds: number = 300): Promise<void> {
  const jsonStr = JSON.stringify(value);

  // 1. Set into Memory Fallback
  const expiry = ttlSeconds > 0 ? Date.now() + ttlSeconds * 1000 : null;
  memoryStore.set(key, { value, expiry });

  // 2. Set into Redis if connected and ready
  const client = getRedisClient();
  if (client && client.status === 'ready') {
    try {
      if (ttlSeconds > 0) {
        await client.set(key, jsonStr, 'EX', ttlSeconds);
      } else {
        await client.set(key, jsonStr);
      }
    } catch {
      // In-memory cache is already updated
    }
  }

  // Periodic cleanup if memory store grows
  if (memoryStore.size > 200) {
    cleanupMemoryCache();
  }
}

/**
 * Delete key or keys matching pattern from Redis and Memory Fallback
 * Supports prefix wildcards, e.g. "settings:*" or "availability:*"
 */
export async function cacheDel(keyOrPattern: string): Promise<void> {
  const isWildcard = keyOrPattern.includes('*');

  // 1. Invalidate Memory Fallback
  if (isWildcard) {
    const regex = new RegExp('^' + keyOrPattern.replace(/\*/g, '.*') + '$');
    for (const k of memoryStore.keys()) {
      if (regex.test(k)) {
        memoryStore.delete(k);
      }
    }
  } else {
    memoryStore.delete(keyOrPattern);
  }

  // 2. Invalidate Redis if ready
  const client = getRedisClient();
  if (client && client.status === 'ready') {
    try {
      if (isWildcard) {
        let cursor = '0';
        do {
          const [nextCursor, keys] = await client.scan(cursor, 'MATCH', keyOrPattern, 'COUNT', 100);
          cursor = nextCursor;
          if (keys.length > 0) {
            await client.del(...keys);
          }
        } while (cursor !== '0');
      } else {
        await client.del(keyOrPattern);
      }
    } catch {
      // Memory store already cleared
    }
  }
}

/**
 * High-level caching wrapper:
 * Retrieves value from cache if present; otherwise invokes `fetcher`, caches the result, and returns it.
 */
export async function cacheFetch<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttlSeconds: number = 300
): Promise<T> {
  const cached = await cacheGet<T>(key);
  if (cached !== null) {
    return cached;
  }

  const fresh = await fetcher();
  if (fresh !== undefined) {
    await cacheSet<T>(key, fresh, ttlSeconds);
  }
  return fresh;
}

/**
 * Health check reporting current caching backend
 */
export async function getCacheStatus(): Promise<{
  activeBackend: 'redis' | 'memory';
  isRedisConnected: boolean;
  redisStatus: string;
  memoryKeyCount: number;
}> {
  const client = getRedisClient();
  const ready = client !== null && client.status === 'ready';
  return {
    activeBackend: ready ? 'redis' : 'memory',
    isRedisConnected: ready,
    redisStatus: client?.status || 'uninitialized',
    memoryKeyCount: memoryStore.size,
  };
}
