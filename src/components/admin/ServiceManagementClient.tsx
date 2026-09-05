'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Edit, Trash2, Check, X, Loader2, Sparkles } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export interface AdminServiceItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  priceStarting?: number | null;
  features: string;
  imageUrl?: string | null;
  isActive: boolean;
}

interface Props {
  initialServices: AdminServiceItem[];
}

export default function ServiceManagementClient({ initialServices }: Props) {
  const router = useRouter();
  const [services, setServices] = useState<AdminServiceItem[]>(initialServices);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<AdminServiceItem | null>(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Wedding',
    description: '',
    priceStarting: '',
    featuresText: '',
    imageUrl: '',
    isActive: true,
  });

  const openCreateModal = () => {
    setEditingService(null);
    setFormData({
      title: '',
      category: 'Wedding',
      description: '',
      priceStarting: '',
      featuresText: 'High definition sound\nCurated custom playlist\nSound technician on-site',
      imageUrl: '',
      isActive: true,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (s: AdminServiceItem) => {
    setEditingService(s);
    let featText = '';
    try {
      const arr = JSON.parse(s.features);
      featText = Array.isArray(arr) ? arr.join('\n') : '';
    } catch {
      featText = s.features;
    }

    setFormData({
      title: s.title,
      category: s.category,
      description: s.description,
      priceStarting: s.priceStarting ? String(s.priceStarting) : '',
      featuresText: featText,
      imageUrl: s.imageUrl || '',
      isActive: s.isActive,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const featuresArray = formData.featuresText
      .split('\n')
      .map((f) => f.trim())
      .filter(Boolean);

    try {
      if (editingService) {
        // Update
        const res = await fetch('/api/admin/services', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: editingService.id,
            title: formData.title,
            category: formData.category,
            description: formData.description,
            priceStarting: formData.priceStarting ? Number(formData.priceStarting) : null,
            features: featuresArray,
            imageUrl: formData.imageUrl,
            isActive: formData.isActive,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          setServices((prev) =>
            prev.map((s) => (s.id === editingService.id ? data.service : s))
          );
          setIsModalOpen(false);
          router.refresh();
        }
      } else {
        // Create
        const res = await fetch('/api/admin/services', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: formData.title,
            category: formData.category,
            description: formData.description,
            priceStarting: formData.priceStarting ? Number(formData.priceStarting) : null,
            features: featuresArray,
            imageUrl: formData.imageUrl,
            isActive: formData.isActive,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          setServices((prev) => [...prev, data.service]);
          setIsModalOpen(false);
          router.refresh();
        }
      }
    } catch {
      alert('Error saving service');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;
    try {
      const res = await fetch(`/api/admin/services?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setServices((prev) => prev.filter((s) => s.id !== id));
        router.refresh();
      }
    } catch {
      alert('Failed to delete service');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">Active Services ({services.length})</h2>
          <p className="text-xs text-zinc-400">Manage individual sound, lighting, and DJ offerings</p>
        </div>
        <button
          onClick={openCreateModal}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-lg"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Service</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s) => (
          <div
            key={s.id}
            className="rounded-3xl glass-panel border border-white/10 overflow-hidden flex flex-col justify-between"
          >
            {s.imageUrl && (
              <div className="relative h-36 w-full overflow-hidden bg-zinc-900">
                <img src={s.imageUrl} alt={s.title} className="w-full h-full object-cover" />
                <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-black/80 text-[10px] font-bold text-purple-300">
                  {s.category}
                </span>
              </div>
            )}

            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-base">{s.title}</h3>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      s.isActive
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-zinc-800 text-zinc-500'
                    }`}
                  >
                    {s.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <p className="text-xs text-zinc-400 mt-1 line-clamp-2">{s.description}</p>
                <div className="mt-2 text-xs font-semibold text-zinc-200">
                  Starts: {s.priceStarting ? formatCurrency(s.priceStarting) : 'Custom'}
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-800 flex items-center justify-end gap-2">
                <button
                  onClick={() => openEditModal(s)}
                  className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white"
                  title="Edit"
                >
                  <Edit className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(s.id)}
                  className="p-1.5 rounded-lg bg-rose-950/50 hover:bg-rose-900 text-rose-300 border border-rose-800/40"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative max-w-lg w-full rounded-3xl glass-panel border border-white/20 p-6 sm:p-8 shadow-2xl animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-white mb-4">
              {editingService ? 'Edit Service' : 'Create New Service'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-zinc-300 block mb-1">Service Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Dry Ice Low Fog & Sparkulars"
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
                    <option value="Wedding">Wedding</option>
                    <option value="Party">Party</option>
                    <option value="Reception">Reception</option>
                    <option value="Sound">Sound System</option>
                    <option value="Lighting">Lighting</option>
                    <option value="Special Effects">Special Effects</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-zinc-300 block mb-1">Starting Price (₹)</label>
                  <input
                    type="number"
                    placeholder="e.g. 15000"
                    value={formData.priceStarting}
                    onChange={(e) => setFormData({ ...formData, priceStarting: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-zinc-300 block mb-1">Image URL (Unsplash or direct)</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="font-semibold text-zinc-300 block mb-1">Description</label>
                <textarea
                  rows={2}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:border-purple-500 resize-none"
                />
              </div>

              <div>
                <label className="font-semibold text-zinc-300 block mb-1">Features (one per line)</label>
                <textarea
                  rows={3}
                  value={formData.featuresText}
                  onChange={(e) => setFormData({ ...formData, featuresText: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:border-purple-500 resize-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="rounded border-zinc-700 text-purple-600 focus:ring-purple-500"
                />
                <label htmlFor="isActive" className="text-zinc-300 font-semibold cursor-pointer">
                  Display this service publicly
                </label>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>Save Service</span>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
