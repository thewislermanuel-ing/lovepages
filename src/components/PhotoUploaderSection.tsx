import React, { useState, useRef } from 'react';
import { GalleryPhoto } from '../types';
import { Upload, Plus, Image as ImageIcon, Trash2, Heart, Sparkles, Check, ZoomIn } from 'lucide-react';
import { playLoveChime } from '../utils/audio';

interface PhotoUploaderSectionProps {
  customPhotos: GalleryPhoto[];
  onAddPhoto: (photo: GalleryPhoto) => void;
  onDeletePhoto: (id: string) => void;
}

export const PhotoUploaderSection: React.FC<PhotoUploaderSectionProps> = ({
  customPhotos,
  onAddPhoto,
  onDeletePhoto,
}) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [photoTitle, setPhotoTitle] = useState('');
  const [photoSubtitle, setPhotoSubtitle] = useState('');
  const [photoDate, setPhotoDate] = useState('');
  const [photoCategory, setPhotoCategory] = useState<'aventuras' | 'romance' | 'detalles'>('aventuras');
  const [photoDescription, setPhotoDescription] = useState('');
  const [imagePreview, setImagePreview] = useState<string>('');
  const [urlInput, setUrlInput] = useState('');
  const [inputMode, setInputMode] = useState<'file' | 'url'>('file');
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit ~5MB
    if (file.size > 5 * 1024 * 1024) {
      alert('La imagen es un poco pesada. Intenta con una imagen menor a 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrlInput(e.target.value);
    setImagePreview(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imagePreview.trim()) {
      alert('Por favor selecciona una foto de tu dispositivo o pega un enlace.');
      return;
    }

    playLoveChime();
    const newPhoto: GalleryPhoto = {
      id: `custom-photo-${Date.now()}`,
      url: imagePreview,
      title: photoTitle.trim() || 'Nuevo Momento Inolvidable',
      subtitle: photoSubtitle.trim() || 'Nuestro amor sigue creciendo',
      date: photoDate.trim() || new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' }),
      category: photoCategory,
      aspectRatio: 'portrait',
      description: photoDescription.trim() || 'Un instante mágico que sumamos a nuestra historia.',
      heartCount: 1,
      isCustom: true,
    };

    onAddPhoto(newPhoto);

    // Reset form
    setPhotoTitle('');
    setPhotoSubtitle('');
    setPhotoDate('');
    setPhotoDescription('');
    setImagePreview('');
    setUrlInput('');
    setIsFormOpen(false);
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-yellow-50 via-amber-50 to-yellow-100/60 border border-amber-200/80 rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100/80 text-amber-900 rounded-full text-xs font-semibold">
            <ImageIcon className="w-3.5 h-3.5 text-amber-700" />
            <span>Apartado 1 · Galería Ilimitada</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-amber-950">
            Agregar Más Fotos Sin Límites
          </h3>
          <p className="text-xs sm:text-sm text-amber-900/70 max-w-xl">
            Sube fotos desde tu teléfono o computadora tantas veces como quieras. Cada nueva foto se integrará inmediatamente a la galería principal con su historia.
          </p>
        </div>

        <button
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="px-5 py-3 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-500 hover:to-yellow-500 text-amber-950 font-semibold rounded-2xl text-xs sm:text-sm shadow-xs hover:shadow-md transition-all active:scale-95 flex items-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>{isFormOpen ? 'Cerrar Formulario' : '➕ Subir Nueva Foto'}</span>
        </button>
      </div>

      {/* Upload Form Modal / Drawer */}
      {isFormOpen && (
        <div className="bg-[#FFFDF7] border-2 border-amber-300 rounded-3xl p-6 sm:p-8 shadow-lg animate-in slide-in-from-top-4 duration-200">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-amber-100">
            <h4 className="font-serif text-xl font-bold text-amber-950 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-600" />
              <span>Añadir un Nuevo Recuerdo Fotográfico</span>
            </h4>
            <span className="text-xs font-serif text-amber-800">√-1♡U∞</span>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Image Source & Preview Column */}
            <div className="md:col-span-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-amber-950 mb-1.5">
                  Método para añadir foto:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setInputMode('file')}
                    className={`py-2 text-xs font-medium rounded-xl border transition-all ${
                      inputMode === 'file'
                        ? 'bg-amber-300 text-amber-950 border-amber-400 shadow-2xs font-semibold'
                        : 'bg-white text-stone-600 border-amber-200 hover:bg-amber-50'
                    }`}
                  >
                    Subir archivo
                  </button>
                  <button
                    type="button"
                    onClick={() => setInputMode('url')}
                    className={`py-2 text-xs font-medium rounded-xl border transition-all ${
                      inputMode === 'url'
                        ? 'bg-amber-300 text-amber-950 border-amber-400 shadow-2xs font-semibold'
                        : 'bg-white text-stone-600 border-amber-200 hover:bg-amber-50'
                    }`}
                  >
                    Enlace / URL
                  </button>
                </div>
              </div>

              {inputMode === 'file' ? (
                <div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full aspect-[4/3] rounded-2xl border-2 border-dashed border-amber-300 hover:border-amber-500 bg-amber-50/50 hover:bg-amber-100/40 flex flex-col items-center justify-center p-4 transition-colors text-center cursor-pointer group overflow-hidden"
                  >
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Vista previa"
                        className="w-full h-full object-cover rounded-xl"
                      />
                    ) : (
                      <>
                        <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 mb-2 group-hover:scale-110 transition-transform">
                          <Upload className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-semibold text-amber-950">
                          Toca aquí para seleccionar foto
                        </span>
                        <span className="text-[11px] text-stone-500 mt-1">
                          PNG, JPG, WEBP desde tu celular o PC
                        </span>
                      </>
                    )}
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <input
                    type="url"
                    placeholder="https://ejemplo.com/nuestra-foto.jpg"
                    value={urlInput}
                    onChange={handleUrlChange}
                    className="w-full px-4 py-2.5 bg-white rounded-xl border border-amber-200 text-xs outline-none focus:border-amber-400"
                  />
                  {imagePreview && (
                    <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-amber-50 border border-amber-200">
                      <img
                        src={imagePreview}
                        alt="Vista previa URL"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Photo Metadata Form Column */}
            <div className="md:col-span-7 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-amber-950 mb-1">
                  Título de la foto *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Nuestra tarde viendo el atardecer"
                  value={photoTitle}
                  onChange={(e) => setPhotoTitle(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white rounded-xl border border-amber-200 text-xs sm:text-sm outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-amber-950 mb-1">
                    Frase corta / Subtítulo
                  </label>
                  <input
                    type="text"
                    placeholder="Ej: Tú y tus sonrisas mágicas"
                    value={photoSubtitle}
                    onChange={(e) => setPhotoSubtitle(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white rounded-xl border border-amber-200 text-xs outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-amber-950 mb-1">
                    Fecha del momento
                  </label>
                  <input
                    type="text"
                    placeholder="Ej: 14 de Febrero"
                    value={photoDate}
                    onChange={(e) => setPhotoDate(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white rounded-xl border border-amber-200 text-xs outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-amber-950 mb-1">
                  Categoría
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { key: 'aventuras', label: 'Aventuras' },
                    { key: 'romance', label: 'Romance' },
                    { key: 'detalles', label: 'Detalles' },
                  ].map((cat) => (
                    <button
                      key={cat.key}
                      type="button"
                      onClick={() => setPhotoCategory(cat.key as typeof photoCategory)}
                      className={`py-2 text-xs font-medium rounded-xl border transition-all ${
                        photoCategory === cat.key
                          ? 'bg-amber-400 text-amber-950 border-amber-400 font-semibold'
                          : 'bg-white text-stone-600 border-amber-200 hover:bg-amber-50'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-amber-950 mb-1">
                  Historia o recuerdo detrás de la foto
                </label>
                <textarea
                  rows={3}
                  placeholder="Escribe lo que sentiste ese día o qué estaban haciendo..."
                  value={photoDescription}
                  onChange={(e) => setPhotoDescription(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white rounded-xl border border-amber-200 text-xs sm:text-sm outline-none focus:border-amber-400 resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 text-xs text-stone-600 hover:text-stone-900 rounded-xl"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-500 hover:to-yellow-500 text-amber-950 font-semibold rounded-xl text-xs shadow-xs flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  <span>Publicar en la Galería</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* List of Custom Added Photos */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-serif text-xl font-bold text-amber-950">
            Nuevas Fotos Agregadas ({customPhotos.length})
          </h4>
          <span className="text-xs text-stone-500">
            {customPhotos.length === 0 ? 'Aún no has agregado fotos adicionales' : 'Guardadas en tu diario'}
          </span>
        </div>

        {customPhotos.length === 0 ? (
          <div className="p-8 text-center bg-amber-50/40 rounded-3xl border border-dashed border-amber-200">
            <ImageIcon className="w-8 h-8 text-amber-400 mx-auto mb-2" />
            <p className="font-serif text-base text-amber-950 font-semibold">
              ¡Este espacio está listo para más fotos!
            </p>
            <p className="text-xs text-stone-500 max-w-sm mx-auto mt-1">
              Presiona el botón "➕ Subir Nueva Foto" para agregar todos los momentos nuevos que vivan juntos.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {customPhotos.map((photo) => (
              <div
                key={photo.id}
                onClick={() => setSelectedPhoto(photo)}
                className="group relative bg-white rounded-2xl overflow-hidden border border-amber-200/80 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
              >
                <div className="relative aspect-[4/5] bg-amber-50 overflow-hidden">
                  <img
                    src={photo.url}
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 right-2.5 flex items-center gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm('¿Deseas eliminar esta foto agregada?')) {
                          onDeletePhoto(photo.id);
                        }
                      }}
                      className="p-1.5 bg-black/60 hover:bg-rose-600 text-white rounded-full transition-colors"
                      title="Eliminar foto"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded-full text-[10px] font-medium text-amber-900">
                    {photo.category}
                  </div>
                </div>

                <div className="p-4 bg-[#FFFDFB]">
                  <h5 className="font-serif font-bold text-amber-950 text-sm leading-snug truncate">
                    {photo.title}
                  </h5>
                  <p className="text-[11px] text-stone-500 truncate mt-0.5">
                    {photo.subtitle}
                  </p>
                  <p className="text-[10px] text-amber-800/80 font-medium mt-2">
                    {photo.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick view modal for custom photos */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="bg-[#FFFDF9] rounded-3xl p-6 max-w-lg w-full border border-amber-300 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-4 bg-black">
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.title}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex items-center justify-between text-xs text-amber-800 font-medium mb-1">
              <span className="capitalize">{selectedPhoto.category}</span>
              <span>{selectedPhoto.date}</span>
            </div>
            <h4 className="font-serif text-2xl font-bold text-amber-950 mb-1">
              {selectedPhoto.title}
            </h4>
            <p className="text-xs text-stone-600 mb-4">{selectedPhoto.description}</p>
            <div className="flex justify-between items-center pt-3 border-t border-amber-100">
              <span className="font-serif font-bold text-amber-900 text-sm">√-1♡U∞</span>
              <button
                onClick={() => setSelectedPhoto(null)}
                className="px-4 py-1.5 bg-amber-400 text-amber-950 font-medium rounded-xl text-xs"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
