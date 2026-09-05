'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Plus,
  Trash2,
  X,
  Loader2,
  Image as ImageIcon,
  MapPin,
  Calendar,
  Film,
  Play,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { GalleryItemData } from '@/components/GalleryLightbox';

interface Props {
  initialItems: GalleryItemData[];
}

export default function GalleryManagementClient({ initialItems }: Props) {
  const router = useRouter();
  const [items, setItems] = useState<GalleryItemData[]>(initialItems);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'IMAGE' | 'VIDEO'>('ALL');

  const [formData, setFormData] = useState({
    mediaType: 'IMAGE' as 'IMAGE' | 'VIDEO',
    title: '',
    category: 'Weddings',
    imageUrl: '',
    videoUrl: '',
    location: 'Rourkela',
    eventDate: '',
  });

  const photoCount = items.filter((i) => (i.mediaType || 'IMAGE').toUpperCase() !== 'VIDEO').length;
  const videoCount = items.filter((i) => (i.mediaType || 'IMAGE').toUpperCase() === 'VIDEO').length;

  const filteredItems = items.filter((item) => {
    const type = (item.mediaType || 'IMAGE').toUpperCase();
    if (activeFilter === 'IMAGE') return type !== 'VIDEO';
    if (activeFilter === 'VIDEO') return type === 'VIDEO';
    return true;
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/admin/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const data = await res.json();
        setItems((prev) => [data.item, ...prev]);
        setIsModalOpen(false);
        setFormData({
          mediaType: 'IMAGE',
          title: '',
          category: 'Weddings',
          imageUrl: '',
          videoUrl: '',
          location: 'Rourkela',
          eventDate: '',
        });
        router.refresh();
      } else {
        const err = await res.json();
        alert(err.error || 'Failed to add item');
      }
    } catch {
      alert('Error uploading item');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, isVideo: boolean) => {
    const label = isVideo ? 'video' : 'photo';
    if (!confirm(`Are you sure you want to delete this ${label}?`)) return;
    try {
      const res = await fetch(`/api/admin/gallery?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setItems((prev) => prev.filter((item) => item.id !== id));
        router.refresh();
      }
    } catch {
      alert(`Failed to delete ${label}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">
            Media Portfolio ({items.length})
          </h2>
          <p className="text-xs text-zinc-400">
            Manage photos and video footage displayed on the public gallery
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Quick Filter Tabs */}
          <div className="inline-flex items-center p-1 rounded-xl bg-zinc-900 border border-zinc-800 text-xs">
            <button
              onClick={() => setActiveFilter('ALL')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                activeFilter === 'ALL'
                  ? 'bg-zinc-800 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              All ({items.length})
            </button>
            <button
              onClick={() => setActiveFilter('IMAGE')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                activeFilter === 'IMAGE'
                  ? 'bg-zinc-800 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Photos ({photoCount})
            </button>
            <button
              onClick={() => setActiveFilter('VIDEO')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                activeFilter === 'VIDEO'
                  ? 'bg-zinc-800 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Videos ({videoCount})
            </button>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-lg shadow-purple-900/40 hover:scale-105 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Media</span>
          </button>
        </div>
      </div>

      {/* Grid of gallery items */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-16 rounded-2xl glass-panel border border-white/5 space-y-2">
          <p className="text-zinc-400 text-sm font-medium">No items found in this view.</p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-xs text-purple-400 hover:underline font-semibold"
          >
            + Add your first item
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredItems.map((item) => {
            const isVideo = (item.mediaType || 'IMAGE').toUpperCase() === 'VIDEO';

            return (
              <div
                key={item.id}
                className="group relative rounded-2xl overflow-hidden glass-panel border border-white/10 aspect-square shadow-lg"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20 opacity-90" />

                {/* Video Play Overlay */}
                {isVideo && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-10 h-10 rounded-full bg-pink-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-4 h-4 fill-current translate-x-0.5" />
                    </div>
                  </div>
                )}

                {/* Top Badges */}
                <div className="absolute top-2 left-2 flex items-center gap-1">
                  <span className="px-2 py-0.5 rounded bg-black/80 text-[10px] font-bold text-purple-300 backdrop-blur-sm border border-white/10">
                    {item.category}
                  </span>
                  {isVideo ? (
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-pink-950/90 text-[10px] font-extrabold text-pink-300 backdrop-blur-sm border border-pink-500/30">
                      <Film className="w-2.5 h-2.5" />
                      Video
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-zinc-900/90 text-[10px] font-bold text-zinc-300 backdrop-blur-sm border border-white/10">
                      <ImageIcon className="w-2.5 h-2.5" />
                      Photo
                    </span>
                  )}
                </div>

                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(item.id, isVideo)}
                  className="absolute top-2 right-2 p-1.5 rounded-lg bg-rose-950/90 text-rose-300 hover:bg-rose-900 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                  title={`Delete ${isVideo ? 'video' : 'photo'}`}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>

                {/* Bottom Information */}
                <div className="absolute bottom-2 left-2 right-2 text-left space-y-0.5">
                  <h4 className="text-xs font-bold text-white truncate">{item.title}</h4>
                  <div className="flex items-center justify-between text-[10px] text-zinc-400">
                    <span>{item.location || 'Rourkela'}</span>
                    {item.eventDate && <span>{item.eventDate}</span>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add Media Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative max-w-md w-full rounded-3xl glass-panel border border-white/20 p-6 sm:p-8 shadow-2xl space-y-4 animate-in zoom-in-95 duration-200 max-h-[95vh] overflow-y-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <h3 className="text-xl font-bold text-white">Add New Gallery Media</h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                Choose to upload a photo or link an event video reel.
              </p>
            </div>

            {/* Media Type Segmented Toggle */}
            <div className="grid grid-cols-2 gap-2 p-1 rounded-2xl bg-zinc-900 border border-zinc-700">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, mediaType: 'IMAGE' })}
                className={`flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-xs transition-all ${
                  formData.mediaType === 'IMAGE'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Photo</span>
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, mediaType: 'VIDEO' })}
                className={`flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-xs transition-all ${
                  formData.mediaType === 'VIDEO'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Film className="w-3.5 h-3.5" />
                <span>Video Reel</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              {formData.mediaType === 'VIDEO' ? (
                <>
                  <div>
                    <label className="font-semibold text-zinc-300 block mb-1">
                      Video URL (YouTube or Direct MP4) *
                    </label>
                    <input
                      type="url"
                      required
                      placeholder="https://www.youtube.com/watch?v=... or https://youtu.be/..."
                      value={formData.videoUrl}
                      onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:border-purple-500"
                    />
                    <p className="text-[11px] text-zinc-500 mt-1">
                      YouTube links will automatically generate a preview thumbnail if left blank below.
                    </p>
                  </div>

                  <div>
                    <label className="font-semibold text-zinc-300 block mb-1">
                      Custom Thumbnail URL (Optional)
                    </label>
                    <input
                      type="url"
                      placeholder="Leave blank to auto-fetch from YouTube"
                      value={formData.imageUrl}
                      onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </>
              ) : (
                <div>
                  <label className="font-semibold text-zinc-300 block mb-1">
                    Image URL *
                  </label>
                  <input
                    type="url"
                    required
                    placeholder="https://images.unsplash.com/..."
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:border-purple-500"
                  />
                </div>
              )}

              <div>
                <label className="font-semibold text-zinc-300 block mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder={
                    formData.mediaType === 'VIDEO'
                      ? 'e.g. Sangeet Grand Entry & Low Fog Drop'
                      : 'e.g. Wedding Reception Stage Setup'
                  }
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-zinc-300 block mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-xs focus:outline-none focus:border-purple-500"
                  >
                    <option value="Weddings">Weddings</option>
                    <option value="Receptions">Receptions</option>
                    <option value="Parties">Parties</option>
                    <option value="Birthdays">Birthdays</option>
                    <option value="Corporate">Corporate</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-zinc-300 block mb-1">Location</label>
                  <input
                    type="text"
                    placeholder="e.g. Brajrajnagar, Jharsuguda"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-zinc-300 block mb-1">Date</label>
                <input
                  type="date"
                  value={formData.eventDate}
                  onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:border-purple-500 [color-scheme:dark]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <span>Save {formData.mediaType === 'VIDEO' ? 'Video' : 'Photo'} to Gallery</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
