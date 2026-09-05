'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Edit, Trash2, Check, Sparkles, Loader2, X, Clock } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { PackageData } from '@/components/PackageCard';

interface Props {
  initialPackages: PackageData[];
}

export default function PackageManagementClient({ initialPackages }: Props) {
  const router = useRouter();
  const [packages, setPackages] = useState<PackageData[]>(initialPackages);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPkg, setEditingPkg] = useState<PackageData | null>(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    durationHours: '4',
    description: '',
    featuresText: 'Professional DJ Performance\nSound System Setup\nIntelligent Lighting\nWireless Microphones',
    equipment: '',
    suitableFor: '',
    isPopular: false,
    isActive: true,
  });

  const openCreateModal = () => {
    setEditingPkg(null);
    setFormData({
      name: '',
      price: '',
      durationHours: '4',
      description: '',
      featuresText: 'Professional DJ Performance\nSound System Setup\nIntelligent Lighting\nWireless Microphones',
      equipment: '2x Tops, 1x Sub, Console, 4x Pars',
      suitableFor: 'Weddings & Celebrations',
      isPopular: false,
      isActive: true,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (p: PackageData) => {
    setEditingPkg(p);
    let featText = '';
    try {
      const arr = JSON.parse(p.features);
      featText = Array.isArray(arr) ? arr.join('\n') : '';
    } catch {
      featText = p.features;
    }

    setFormData({
      name: p.name,
      price: String(p.price),
      durationHours: String(p.durationHours),
      description: p.description,
      featuresText: featText,
      equipment: p.equipment,
      suitableFor: p.suitableFor,
      isPopular: !!p.isPopular,
      isActive: true,
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
      if (editingPkg) {
        const res = await fetch('/api/admin/packages', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: editingPkg.id,
            name: formData.name,
            price: Number(formData.price),
            durationHours: Number(formData.durationHours),
            description: formData.description,
            features: featuresArray,
            equipment: formData.equipment,
            suitableFor: formData.suitableFor,
            isPopular: formData.isPopular,
            isActive: formData.isActive,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          setPackages((prev) =>
            prev.map((p) => (p.id === editingPkg.id ? data.package : p))
          );
          setIsModalOpen(false);
          router.refresh();
        }
      } else {
        const res = await fetch('/api/admin/packages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            price: Number(formData.price),
            durationHours: Number(formData.durationHours),
            description: formData.description,
            features: featuresArray,
            equipment: formData.equipment,
            suitableFor: formData.suitableFor,
            isPopular: formData.isPopular,
            isActive: formData.isActive,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          setPackages((prev) => [...prev, data.package]);
          setIsModalOpen(false);
          router.refresh();
        }
      }
    } catch {
      alert('Error saving package');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this package?')) return;
    try {
      const res = await fetch(`/api/admin/packages?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setPackages((prev) => prev.filter((p) => p.id !== id));
        router.refresh();
      }
    } catch {
      alert('Failed to delete package');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">Event Packages ({packages.length})</h2>
          <p className="text-xs text-zinc-400">Set pricing, duration, features, and promote best-sellers</p>
        </div>
        <button
          onClick={openCreateModal}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-lg"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Package</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => {
          let featList: string[] = [];
          try {
            featList = JSON.parse(pkg.features);
          } catch {
            featList = [];
          }

          return (
            <div
              key={pkg.id}
              className={`rounded-3xl glass-panel border p-6 flex flex-col justify-between space-y-4 ${
                pkg.isPopular ? 'border-purple-500/60 shadow-xl shadow-purple-950/40' : 'border-white/10'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="font-black text-white text-lg">{pkg.name}</h3>
                  {pkg.isPopular && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/40">
                      Most Popular
                    </span>
                  )}
                </div>
                <p className="text-xs text-zinc-400 mt-1 min-h-[32px]">{pkg.description}</p>

                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-2xl font-black text-white">
                    {formatCurrency(pkg.price)}
                  </span>
                  <span className="text-xs text-zinc-500">/ {pkg.durationHours} hrs</span>
                </div>

                <div className="mt-4 pt-3 border-t border-zinc-800 space-y-1.5 text-xs text-zinc-300">
                  {featList.slice(0, 4).map((f, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                      <span className="truncate">{f}</span>
                    </div>
                  ))}
                  {featList.length > 4 && (
                    <span className="text-[10px] text-zinc-500 block pt-1">
                      +{featList.length - 4} more inclusions
                    </span>
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-800 flex items-center justify-between">
                <span className="text-[11px] text-zinc-400 truncate max-w-[160px]">
                  {pkg.suitableFor}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEditModal(pkg)}
                    className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white"
                    title="Edit"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(pkg.id)}
                    className="p-1.5 rounded-lg bg-rose-950/50 hover:bg-rose-900 text-rose-300 border border-rose-800/40"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
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
              {editingPkg ? 'Edit Package' : 'Create New Package'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="font-semibold text-zinc-300 block mb-1">Package Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Royal Wedding Extravaganza"
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-zinc-300 block mb-1">Price (₹)</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 25000"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="font-semibold text-zinc-300 block mb-1">Duration (Hours)</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 5"
                    value={formData.durationHours}
                    onChange={(e) => setFormData({ ...formData, durationHours: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-zinc-300 block mb-1">Suitable Event Types</label>
                <input
                  type="text"
                  placeholder="e.g. Weddings, Receptions & Sangeet (Up to 400 Guests)"
                  value={formData.suitableFor}
                  onChange={(e) => setFormData({ ...formData, suitableFor: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="font-semibold text-zinc-300 block mb-1">Equipment Summary</label>
                <input
                  type="text"
                  placeholder="e.g. 4x Tops, 2x Subs, 4x Moving Heads, Fog Machine"
                  value={formData.equipment}
                  onChange={(e) => setFormData({ ...formData, equipment: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="font-semibold text-zinc-300 block mb-1">Short Description</label>
                <textarea
                  rows={2}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:border-purple-500 resize-none"
                />
              </div>

              <div>
                <label className="font-semibold text-zinc-300 block mb-1">Features Included (one per line)</label>
                <textarea
                  rows={3}
                  value={formData.featuresText}
                  onChange={(e) => setFormData({ ...formData, featuresText: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:border-purple-500 resize-none"
                />
              </div>

              <div className="flex items-center gap-4 pt-1">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isPopular"
                    checked={formData.isPopular}
                    onChange={(e) => setFormData({ ...formData, isPopular: e.target.checked })}
                    className="rounded border-zinc-700 text-purple-600 focus:ring-purple-500"
                  />
                  <label htmlFor="isPopular" className="text-zinc-300 font-semibold cursor-pointer">
                    Highlight as Most Popular ⭐
                  </label>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>Save Package</span>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
