'use client';

import React, { useState, useRef } from 'react';
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
  UploadCloud,
  CheckCircle2,
  RefreshCw,
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
  const [uploadStatus, setUploadStatus] = useState('');
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'IMAGE' | 'VIDEO'>('ALL');

  const [mediaType, setMediaType] = useState<'IMAGE' | 'VIDEO'>('IMAGE');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Weddings');
  const [location, setLocation] = useState('Rourkela');
  const [eventDate, setEventDate] = useState('');

  // Selected file objects & local previews
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);

  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);

  const photoInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);

  const photoCount = items.filter((i) => (i.mediaType || 'IMAGE').toUpperCase() !== 'VIDEO').length;
  const videoCount = items.filter((i) => (i.mediaType || 'IMAGE').toUpperCase() === 'VIDEO').length;

  const filteredItems = items.filter((item) => {
    const type = (item.mediaType || 'IMAGE').toUpperCase();
    if (activeFilter === 'IMAGE') return type !== 'VIDEO';
    if (activeFilter === 'VIDEO') return type === 'VIDEO';
    return true;
  });

  const resetForm = () => {
    if (photoPreview) URL.revokeObjectURL(photoPreview);
    if (videoPreview) URL.revokeObjectURL(videoPreview);
    if (thumbnailPreview) URL.revokeObjectURL(thumbnailPreview);
    setPhotoFile(null);
    setPhotoPreview(null);
    setVideoFile(null);
    setVideoPreview(null);
    setThumbnailFile(null);
    setThumbnailPreview(null);
    setTitle('');
    setLocation('Rourkela');
    setEventDate('');
    setCategory('Weddings');
    setMediaType('IMAGE');
    setUploadStatus('');
  };

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (photoPreview) URL.revokeObjectURL(photoPreview);
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const handleVideoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (videoPreview) URL.revokeObjectURL(videoPreview);
    setVideoFile(file);
    setVideoPreview(URL.createObjectURL(file));
  };

  const handleThumbnailSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (thumbnailPreview) URL.revokeObjectURL(thumbnailPreview);
    setThumbnailFile(file);
    setThumbnailPreview(URL.createObjectURL(file));
  };

  const uploadFile = async (file: File): Promise<string> => {
    const data = new FormData();
    data.append('file', file);
    const res = await fetch('/api/admin/upload', {
      method: 'POST',
      body: data,
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to upload media file');
    }
    const json = await res.json();
    return json.url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (mediaType === 'IMAGE' && !photoFile) {
      alert('Please select a photo file from your media to upload.');
      return;
    }

    if (mediaType === 'VIDEO' && !videoFile) {
      alert('Please select a video file from your media to upload.');
      return;
    }

    if (!title.trim()) {
      alert('Please provide an event title.');
      return;
    }

    setLoading(true);

    try {
      let finalImageUrl = '';
      let finalVideoUrl = '';

      if (mediaType === 'IMAGE' && photoFile) {
        setUploadStatus('Uploading photo from media...');
        finalImageUrl = await uploadFile(photoFile);
      } else if (mediaType === 'VIDEO' && videoFile) {
        setUploadStatus('Uploading video from media (this may take a few moments)...');
        finalVideoUrl = await uploadFile(videoFile);

        if (thumbnailFile) {
          setUploadStatus('Uploading custom video thumbnail...');
          finalImageUrl = await uploadFile(thumbnailFile);
        } else {
          // Fallback stage backdrop if no custom thumbnail
          finalImageUrl = 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80';
        }
      }

      setUploadStatus('Saving to gallery...');
      const res = await fetch('/api/admin/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          category,
          location,
          eventDate,
          mediaType,
          imageUrl: finalImageUrl,
          videoUrl: finalVideoUrl,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setItems((prev) => [data.item, ...prev]);
        resetForm();
        setIsModalOpen(false);
        router.refresh();
      } else {
        const err = await res.json();
        alert(err.error || 'Failed to save item');
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error uploading media item';
      alert(message);
    } finally {
      setLoading(false);
      setUploadStatus('');
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

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
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
            Upload photos and videos directly from your device media to showcase on the live website
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Filter Tabs */}
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
            <span>Upload Media</span>
          </button>
        </div>
      </div>

      {/* Grid of gallery items */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-16 rounded-2xl glass-panel border border-white/5 space-y-2">
          <p className="text-zinc-400 text-sm font-medium">No media found in this view.</p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-xs text-purple-400 hover:underline font-semibold"
          >
            + Upload your first photo or video
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

      {/* Upload Media Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative max-w-md w-full rounded-3xl glass-panel border border-white/20 p-6 sm:p-8 shadow-2xl space-y-4 animate-in zoom-in-95 duration-200 max-h-[95vh] overflow-y-auto">
            <button
              onClick={() => {
                resetForm();
                setIsModalOpen(false);
              }}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <h3 className="text-xl font-bold text-white">Upload New Gallery Media</h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                Select a photo or video reel directly from your media files.
              </p>
            </div>

            {/* Media Type Toggle */}
            <div className="grid grid-cols-2 gap-2 p-1 rounded-2xl bg-zinc-900 border border-zinc-700">
              <button
                type="button"
                onClick={() => setMediaType('IMAGE')}
                className={`flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-xs transition-all ${
                  mediaType === 'IMAGE'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Photo</span>
              </button>
              <button
                type="button"
                onClick={() => setMediaType('VIDEO')}
                className={`flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-xs transition-all ${
                  mediaType === 'VIDEO'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Film className="w-3.5 h-3.5" />
                <span>Video Reel</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* PHOTO UPLOAD ZONE */}
              {mediaType === 'IMAGE' ? (
                <div>
                  <label className="font-semibold text-zinc-300 block mb-1.5">
                    Select Photo File from Media *
                  </label>

                  <input
                    ref={photoInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoSelect}
                    className="hidden"
                  />

                  {photoPreview && photoFile ? (
                    <div className="relative rounded-2xl overflow-hidden border border-purple-500/40 bg-zinc-900 p-2 space-y-2">
                      <div className="relative h-44 w-full rounded-xl overflow-hidden bg-black">
                        <img
                          src={photoPreview}
                          alt="Preview"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex items-center justify-between px-1 text-[11px] text-zinc-300">
                        <div className="flex items-center gap-1.5 truncate max-w-[200px]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span className="truncate">{photoFile.name}</span>
                        </div>
                        <span className="text-zinc-500 shrink-0 font-mono">
                          {formatFileSize(photoFile.size)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => photoInputRef.current?.click()}
                          className="flex-1 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                        >
                          <RefreshCw className="w-3 h-3" />
                          <span>Change Photo</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (photoPreview) URL.revokeObjectURL(photoPreview);
                            setPhotoFile(null);
                            setPhotoPreview(null);
                          }}
                          className="p-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900 text-rose-300 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div
                      onClick={() => photoInputRef.current?.click()}
                      className="flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-dashed border-purple-500/40 hover:border-pink-500 bg-zinc-900/60 hover:bg-zinc-900/90 cursor-pointer transition-all group text-center space-y-2"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-purple-500/10 group-hover:bg-purple-500/20 text-purple-400 flex items-center justify-center transition-colors">
                        <UploadCloud className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-bold text-white text-sm">
                          Click to browse from your device
                        </p>
                        <p className="text-[11px] text-zinc-400 mt-0.5">
                          Supports JPG, PNG, WEBP, GIF (up to 20MB)
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* VIDEO UPLOAD ZONE */
                <div className="space-y-3">
                  <div>
                    <label className="font-semibold text-zinc-300 block mb-1.5">
                      Select Video File from Media *
                    </label>

                    <input
                      ref={videoInputRef}
                      type="file"
                      accept="video/*"
                      onChange={handleVideoSelect}
                      className="hidden"
                    />

                    {videoPreview && videoFile ? (
                      <div className="relative rounded-2xl overflow-hidden border border-pink-500/40 bg-zinc-900 p-2 space-y-2">
                        <video
                          src={videoPreview}
                          controls
                          className="w-full h-44 rounded-xl bg-black object-contain"
                        />
                        <div className="flex items-center justify-between px-1 text-[11px] text-zinc-300">
                          <div className="flex items-center gap-1.5 truncate max-w-[200px]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                            <span className="truncate">{videoFile.name}</span>
                          </div>
                          <span className="text-zinc-500 shrink-0 font-mono">
                            {formatFileSize(videoFile.size)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 pt-1">
                          <button
                            type="button"
                            onClick={() => videoInputRef.current?.click()}
                            className="flex-1 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                          >
                            <RefreshCw className="w-3 h-3" />
                            <span>Change Video</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              if (videoPreview) URL.revokeObjectURL(videoPreview);
                              setVideoFile(null);
                              setVideoPreview(null);
                            }}
                            className="p-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900 text-rose-300 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div
                        onClick={() => videoInputRef.current?.click()}
                        className="flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-dashed border-pink-500/40 hover:border-pink-400 bg-zinc-900/60 hover:bg-zinc-900/90 cursor-pointer transition-all group text-center space-y-2"
                      >
                        <div className="w-12 h-12 rounded-2xl bg-pink-500/10 group-hover:bg-pink-500/20 text-pink-400 flex items-center justify-center transition-colors">
                          <Film className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="font-bold text-white text-sm">
                            Click to choose video from media
                          </p>
                          <p className="text-[11px] text-zinc-400 mt-0.5">
                            Supports MP4, WebM, MOV (up to 100MB)
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Optional Video Thumbnail Upload */}
                  <div>
                    <label className="font-semibold text-zinc-300 block mb-1">
                      Custom Video Cover Thumbnail (Optional)
                    </label>

                    <input
                      ref={thumbnailInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleThumbnailSelect}
                      className="hidden"
                    />

                    {thumbnailPreview && thumbnailFile ? (
                      <div className="flex items-center justify-between p-2 rounded-xl bg-zinc-900 border border-zinc-700">
                        <div className="flex items-center gap-2 truncate">
                          <img
                            src={thumbnailPreview}
                            alt="Thumb"
                            className="w-10 h-10 rounded-lg object-cover bg-black shrink-0"
                          />
                          <span className="text-[11px] text-zinc-300 truncate">
                            {thumbnailFile.name}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            if (thumbnailPreview) URL.revokeObjectURL(thumbnailPreview);
                            setThumbnailFile(null);
                            setThumbnailPreview(null);
                          }}
                          className="p-1 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => thumbnailInputRef.current?.click()}
                        className="w-full py-2 px-3 rounded-xl bg-zinc-900 border border-zinc-700 hover:border-zinc-500 text-zinc-400 hover:text-zinc-200 text-xs flex items-center justify-center gap-2 transition-colors"
                      >
                        <ImageIcon className="w-3.5 h-3.5 text-purple-400" />
                        <span>Upload Cover Image (Optional)</span>
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* EVENT TITLE */}
              <div>
                <label className="font-semibold text-zinc-300 block mb-1">
                  Event / Media Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder={
                    mediaType === 'VIDEO'
                      ? 'e.g. Sangeet Grand Entry & Low Fog Drop'
                      : 'e.g. Wedding Reception Stage Setup'
                  }
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:border-purple-500"
                />
              </div>

              {/* CATEGORY & LOCATION */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-zinc-300 block mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
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
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              {/* DATE */}
              <div>
                <label className="font-semibold text-zinc-300 block mb-1">Event Date</label>
                <input
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:border-purple-500 [color-scheme:dark]"
                />
              </div>

              {/* UPLOAD STATUS DISPLAY */}
              {uploadStatus && (
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-purple-950/40 border border-purple-500/30 text-purple-300 text-xs">
                  <Loader2 className="w-4 h-4 animate-spin shrink-0" />
                  <span className="truncate">{uploadStatus}</span>
                </div>
              )}

              {/* SUBMIT BUTTON */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform disabled:opacity-60 disabled:hover:scale-100"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>{uploadStatus || 'Uploading...'}</span>
                    </>
                  ) : (
                    <span>Upload {mediaType === 'VIDEO' ? 'Video' : 'Photo'} to Gallery</span>
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
