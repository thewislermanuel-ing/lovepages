import React, { useState } from 'react';
import { GALLERY_PHOTOS } from '../data/content';
import { GalleryPhoto } from '../types';
import { Heart, ZoomIn, X, ChevronLeft, ChevronRight, Sparkles, Plus } from 'lucide-react';
import { playLoveChime } from '../utils/audio';

interface PhotoGalleryProps {
  customPhotos?: GalleryPhoto[];
  onNavigateToUpload?: () => void;
  onPhotoClick?: (photo: GalleryPhoto) => void;
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({
  customPhotos = [],
  onNavigateToUpload,
}) => {
  const [activeCategory, setActiveCategory] = useState<'todos' | 'aventuras' | 'romance' | 'detalles'>('todos');
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);

  const allPhotos = [...customPhotos, ...GALLERY_PHOTOS];

  const [likes, setLikes] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    allPhotos.forEach((p) => {
      initial[p.id] = p.heartCount;
    });
    return initial;
  });
  const [hasLiked, setHasLiked] = useState<Record<string, boolean>>({});

  const filteredPhotos = activeCategory === 'todos'
    ? allPhotos
    : allPhotos.filter((p) => p.category === activeCategory);

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playLoveChime();
    setHasLiked((prev) => ({ ...prev, [id]: !prev[id] }));
    setLikes((prev) => ({
      ...prev,
      [id]: prev[id] + (hasLiked[id] ? -1 : 1),
    }));
  };

  const handleNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedPhoto) return;
    const currentIndex = filteredPhotos.findIndex((p) => p.id === selectedPhoto.id);
    const nextIndex = (currentIndex + 1) % filteredPhotos.length;
    setSelectedPhoto(filteredPhotos[nextIndex]);
  };

  const handlePrevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedPhoto) return;
    const currentIndex = filteredPhotos.findIndex((p) => p.id === selectedPhoto.id);
    const prevIndex = (currentIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
    setSelectedPhoto(filteredPhotos[prevIndex]);
  };

  return (
    <div className="space-y-8">
      {/* Category Header Banner with Cover Image */}
      <div className="relative rounded-3xl overflow-hidden border border-amber-200/80 bg-gradient-to-r from-amber-50 to-yellow-100/50 p-6 sm:p-10 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-7 space-y-3">
            <div className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-800 tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Nuestra Galería de Recuerdos</span>
            </div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-amber-950">
              Instantes Capturados para la Eternidad
            </h3>
            <p className="text-sm sm:text-base text-amber-900/70 leading-relaxed max-w-xl">
              Cada fotografía cuenta un pedazo de nuestra historia. Tus sonrisas, nuestros viajes, las flores que te alegran el día y los abrazos que me devuelven la vida.
            </p>

            {/* Filter Tabs & Add Photo CTA */}
            <div className="pt-2 flex flex-wrap items-center gap-2">
              {[
                { key: 'todos', label: 'Todas las Fotos' },
                { key: 'aventuras', label: 'Aventuras & Viajes' },
                { key: 'romance', label: 'Romance & Noches' },
                { key: 'detalles', label: 'Detalles & Sonrisas' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveCategory(tab.key as typeof activeCategory)}
                  className={`px-4 py-2 text-xs font-medium rounded-xl transition-all whitespace-nowrap ${
                    activeCategory === tab.key
                      ? 'bg-amber-400 text-amber-950 shadow-xs font-semibold'
                      : 'bg-white/80 text-amber-900/80 hover:bg-amber-100/80 hover:text-amber-950 border border-amber-200/50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}

              {onNavigateToUpload && (
                <button
                  onClick={onNavigateToUpload}
                  className="px-4 py-2 text-xs font-semibold rounded-xl bg-amber-200/80 hover:bg-amber-300 text-amber-950 transition-all flex items-center gap-1.5 shadow-2xs border border-amber-300/80 ml-auto sm:ml-0"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Subir Más Fotos</span>
                </button>
              )}
            </div>
          </div>

          {/* Cover Polaroid Preview */}
          <div className="md:col-span-5 flex justify-center md:justify-end">
            <div className="relative group cursor-pointer" onClick={() => setSelectedPhoto(GALLERY_PHOTOS[0])}>
              <div className="bg-white p-3 pb-8 rounded-xl shadow-md border border-amber-100 rotate-2 group-hover:rotate-0 transition-transform duration-300 max-w-[260px]">
                <div className="aspect-[4/5] overflow-hidden rounded-lg bg-amber-100/50">
                  <img
                    src="/assets/aistudio/image_48f99536.png"
                    alt="Portada Galería Polaroids & Girasoles"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="mt-3 text-center">
                  <p className="font-serif text-sm font-semibold text-amber-950">Nuestros Polaroids</p>
                  <p className="text-[11px] text-amber-800/70 italic">Girasoles & recuerdos eternos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Photos Masonry / Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredPhotos.map((photo, index) => {
          const isLiked = hasLiked[photo.id];
          const count = likes[photo.id] || photo.heartCount;

          return (
            <div
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className="group bg-white rounded-2xl overflow-hidden border border-amber-200/60 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col cursor-pointer transform hover:-translate-y-1"
            >
              {/* Photo Media Frame */}
              <div className="relative aspect-[4/5] bg-amber-50/50 overflow-hidden">
                <img
                  src={photo.url}
                  alt={photo.title}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Subtle scrim & quick view badge */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <div className="flex items-center justify-between w-full text-white text-xs">
                    <span className="flex items-center gap-1 font-medium">
                      <ZoomIn className="w-3.5 h-3.5" />
                      <span>Ver foto completa</span>
                    </span>
                    <span className="text-[11px] opacity-80">{photo.date}</span>
                  </div>
                </div>

                {/* Floating Heart Like Action */}
                <button
                  onClick={(e) => handleLike(photo.id, e)}
                  className={`absolute top-3 right-3 p-2 rounded-full transition-transform active:scale-75 shadow-xs ${
                    isLiked
                      ? 'bg-rose-500 text-white'
                      : 'bg-white/80 hover:bg-white text-stone-600 hover:text-rose-500 backdrop-blur-xs'
                  }`}
                  aria-label="Dar amor a esta foto"
                >
                  <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Photo Details */}
              <div className="p-4 flex-1 flex flex-col justify-between bg-[#FFFDFB]">
                <div>
                  <div className="flex items-center justify-between gap-2 text-[11px] text-amber-800/80 mb-1">
                    <span className="capitalize">{photo.category}</span>
                    <span className="tabular-nums font-medium text-amber-900 flex items-center gap-1">
                      <Heart className="w-3 h-3 fill-rose-500 text-rose-500" />
                      {count}
                    </span>
                  </div>
                  <h4 className="font-serif font-semibold text-stone-900 text-base leading-snug group-hover:text-amber-800 transition-colors">
                    {photo.title}
                  </h4>
                  <p className="text-xs text-stone-500 line-clamp-2 mt-1 leading-relaxed">
                    {photo.description}
                  </p>
                </div>

                <div className="pt-3 mt-2 border-t border-amber-100/60 flex items-center justify-between text-[11px] text-amber-900/60">
                  <span className="italic">{photo.subtitle}</span>
                  <span className="font-serif text-amber-700">√-1♡U∞</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[92vh] bg-[#FFFDF9] rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row border border-amber-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-20 p-2 text-stone-700 hover:text-stone-950 bg-white/80 hover:bg-white rounded-full shadow-md transition-colors"
              aria-label="Cerrar visor"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Navigation arrows */}
            <button
              onClick={handlePrevPhoto}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2.5 bg-white/80 hover:bg-white text-stone-800 rounded-full shadow-md transition-all hover:scale-105"
              aria-label="Foto anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNextPhoto}
              className="absolute right-4 top-1/2 -translate-y-1/2 md:right-[380px] z-20 p-2.5 bg-white/80 hover:bg-white text-stone-800 rounded-full shadow-md transition-all hover:scale-105"
              aria-label="Foto siguiente"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Photo Viewport */}
            <div className="flex-1 bg-black/90 flex items-center justify-center p-2 sm:p-4 min-h-[320px] md:min-h-[500px]">
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.title}
                referrerPolicy="no-referrer"
                className="max-h-[80vh] w-auto max-w-full object-contain rounded-lg"
              />
            </div>

            {/* Sidebar Details */}
            <div className="w-full md:w-96 p-6 sm:p-8 flex flex-col justify-between bg-[#FFFDF9] border-t md:border-t-0 md:border-l border-amber-100 overflow-y-auto">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-amber-800 font-medium">
                  <span className="uppercase tracking-wider">{selectedPhoto.category}</span>
                  <span className="text-stone-500">{selectedPhoto.date}</span>
                </div>

                <div>
                  <h3 className="text-2xl font-serif font-bold text-amber-950">
                    {selectedPhoto.title}
                  </h3>
                  <p className="text-xs text-amber-800/80 italic mt-0.5">
                    {selectedPhoto.subtitle}
                  </p>
                </div>

                <div className="p-4 bg-amber-50/70 rounded-2xl border border-amber-200/60">
                  <p className="text-sm text-amber-950 leading-relaxed font-sans">
                    {selectedPhoto.description}
                  </p>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-6 mt-6 border-t border-amber-100 flex items-center justify-between">
                <button
                  onClick={(e) => handleLike(selectedPhoto.id, e)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all shadow-xs ${
                    hasLiked[selectedPhoto.id]
                      ? 'bg-rose-500 text-white'
                      : 'bg-amber-100/70 hover:bg-amber-200/70 text-amber-950'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${hasLiked[selectedPhoto.id] ? 'fill-current' : ''}`} />
                  <span>{hasLiked[selectedPhoto.id] ? '¡Te encanta!' : 'Me encanta'}</span>
                  <span className="tabular-nums ml-1">({likes[selectedPhoto.id] || selectedPhoto.heartCount})</span>
                </button>

                <span className="text-xs font-serif font-semibold text-amber-800">
                  √-1♡U∞
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
