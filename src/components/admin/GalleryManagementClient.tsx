'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Trash2, X, Loader2, Image as ImageIcon, MapPin, Calendar } from 'lucide-react';
import { GalleryItemData } from '@/components/GalleryLightbox';

interface Props {
  initialItems: GalleryItemData[];
}

export default function GalleryManagementClient({ initialItems }: Props) {
  const router = useRouter();
  const [items, setItems] = useState<GalleryItemData[]>(initialItems);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Weddings',
    imageUrl: '',
    location: 'Rourkela',
    eventDate: '',
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
          title: '',
          category: 'Weddings',
          imageUrl: '',
          location: 'Rourkela',
          eventDate: '',
        });
        router.refresh();
      } else {
        const err = await res.json();
        alert(err.error || 'Failed to add image');
      }
    } catch {
      alert('Error uploading image');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this photo?')) return;
    try {
      const res = await fetch(`/api/admin/gallery?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setItems((prev) => prev.filter((item) => item.id !== id));
        router.refresh();
      }
    } catch {
      alert('Failed to delete photo');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">Event Photos ({items.length})</h2>
          <p className="text-xs text-zinc-400">Add or remove portfolio pictures shown on the public site</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-lg"
        >
          <Plus className="w-4 h-4" />
          <span>Add Photo</span>
        </button>
      </div>

      {/* Grid of gallery items */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="group relative rounded-2xl overflow-hidden glass-panel border border-white/10 aspect-square shadow-lg"
          >
            <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />

            <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/80 text-[10px] font-bold text-purple-300">
              {item.category}
            </span>

            <button
              onClick={() => handleDelete(item.id)}
              className="absolute top-2 right-2 p-1.5 rounded-lg bg-rose-950/80 text-rose-300 hover:bg-rose-900 opacity-0 group-hover:opacity-100 transition-opacity"
              title="Delete photo"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>

            <div className="absolute bottom-2 left-2 right-2 text-left">
              <h4 className="text-xs font-bold text-white truncate">{item.title}</h4>
              <div className="flex items-center gap-2 text-[10px] text-zinc-400 mt-0.5">
                {item.location && <span>{item.location}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative max-w-md w-full rounded-3xl glass-panel border border-white/20 p-6 sm:p-8 shadow-2xl space-y-4 animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <h3 className="text-xl font-bold text-white">Add New Portfolio Image</h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                Provide an image URL and event details.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-zinc-300 block mb-1">Image URL</label>
                <input
                  type="url"
                  required
                  placeholder="https://images.unsplash.com/..."
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="font-semibold text-zinc-300 block mb-1">Event / Photo Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sangeet Dance Floor Explosion"
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
                    placeholder="e.g. Mayfair, Rourkela"
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
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>Save to Gallery</span>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
