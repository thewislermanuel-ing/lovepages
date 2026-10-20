import React, { useState, useEffect } from 'react';
import { QuickNote } from '../types';
import { INITIAL_QUICK_NOTES } from '../data/content';
import { StickyNote, Plus, Pin, Trash2, Sparkles, Check, Heart } from 'lucide-react';
import { playLoveChime } from '../utils/audio';

const LOCAL_STORAGE_KEY = 'romantic_quick_notes_v1';

export const QuickNotesSection: React.FC = () => {
  const [notes, setNotes] = useState<QuickNote[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [color, setColor] = useState<'yellow' | 'peach' | 'rose' | 'amber'>('yellow');
  const [tag, setTag] = useState('🌻 Cariño');
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        setNotes(JSON.parse(stored));
      } else {
        setNotes(INITIAL_QUICK_NOTES);
      }
    } catch {
      setNotes(INITIAL_QUICK_NOTES);
    }
  }, []);

  const saveNotes = (updated: QuickNote[]) => {
    setNotes(updated);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // safe fallback
    }
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    playLoveChime();
    const newNote: QuickNote = {
      id: `qnote-${Date.now()}`,
      title: title.trim(),
      content: content.trim(),
      date: new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'short' }),
      color,
      tag,
      pinned,
    };

    const updated = pinned ? [newNote, ...notes] : [...notes, newNote];
    saveNotes(updated);

    // Reset
    setTitle('');
    setContent('');
    setIsFormOpen(false);
    setPinned(false);
  };

  const togglePin = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playLoveChime();
    const updated = notes.map((n) => (n.id === id ? { ...n, pinned: !n.pinned } : n));
    // Sort pinned to top
    updated.sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));
    saveNotes(updated);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('¿Deseas borrar esta nota?')) {
      const updated = notes.filter((n) => n.id !== id);
      saveNotes(updated);
    }
  };

  const getColorClasses = (c: QuickNote['color']) => {
    switch (c) {
      case 'rose':
        return 'bg-[#FFF1F2] border-rose-300 text-rose-950 shadow-rose-100';
      case 'peach':
        return 'bg-[#FFF7ED] border-orange-300 text-orange-950 shadow-orange-100';
      case 'amber':
        return 'bg-[#FEF3C7] border-amber-300 text-amber-950 shadow-amber-100';
      case 'yellow':
      default:
        return 'bg-[#FEFCE8] border-yellow-300 text-yellow-950 shadow-yellow-100';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-yellow-50 via-amber-50 to-orange-50 border border-amber-200/80 rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100/80 text-amber-900 rounded-full text-xs font-semibold">
            <StickyNote className="w-3.5 h-3.5 text-amber-700" />
            <span>Apartado 2 · Pizarra de Notas Ilimitadas</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-amber-950">
            Agregar Más Notas de Amor Sin Límites
          </h3>
          <p className="text-xs sm:text-sm text-amber-900/70 max-w-xl">
            Pequeños recordatorios, mensajitos dulces, citas planeadas o detalles del día a día. Escribe todas las notas que desees, fíjalas con chincheta y cámbialas de color.
          </p>
        </div>

        <button
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="px-5 py-3 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-500 hover:to-yellow-500 text-amber-950 font-semibold rounded-2xl text-xs sm:text-sm shadow-xs hover:shadow-md transition-all active:scale-95 flex items-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>{isFormOpen ? 'Cerrar Formulario' : '➕ Crear Nueva Nota'}</span>
        </button>
      </div>

      {/* Form Drawer */}
      {isFormOpen && (
        <div className="bg-[#FFFDF7] border-2 border-amber-300 rounded-3xl p-6 sm:p-8 shadow-lg animate-in slide-in-from-top-4 duration-200">
          <div className="flex items-center justify-between pb-3 mb-5 border-b border-amber-100">
            <h4 className="font-serif text-xl font-bold text-amber-950 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-600" />
              <span>Nueva Nota Romántica</span>
            </h4>
            <span className="text-xs font-serif text-amber-800">√-1♡U∞</span>
          </div>

          <form onSubmit={handleAddNote} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-amber-950 mb-1">
                  Título de la nota *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Te ves preciosa hoy / No olvides que te amo"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white rounded-xl border border-amber-200 text-xs sm:text-sm outline-none focus:border-amber-400 text-stone-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-amber-950 mb-1">
                  Etiqueta temática
                </label>
                <select
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white rounded-xl border border-amber-200 text-xs sm:text-sm outline-none focus:border-amber-400 text-stone-900"
                >
                  <option value="🌻 Cariño">🌻 Cariño</option>
                  <option value="❤️ Besos">❤️ Besos</option>
                  <option value="🎨 Cita Pendiente">🎨 Cita Pendiente</option>
                  <option value="✨ Promesa">✨ Promesa</option>
                  <option value="💭 Pensamiento">💭 Pensamiento</option>
                  <option value="☕ Detalle">☕ Detalle</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-amber-950 mb-1.5">
                Color del Post-it:
              </label>
              <div className="flex gap-2">
                {[
                  { key: 'yellow', label: 'Amarillo', bg: 'bg-[#FEFCE8] border-yellow-300' },
                  { key: 'peach', label: 'Melocotón', bg: 'bg-[#FFF7ED] border-orange-300' },
                  { key: 'rose', label: 'Rosa', bg: 'bg-[#FFF1F2] border-rose-300' },
                  { key: 'amber', label: 'Ámbar', bg: 'bg-[#FEF3C7] border-amber-300' },
                ].map((c) => (
                  <button
                    key={c.key}
                    type="button"
                    onClick={() => setColor(c.key as typeof color)}
                    className={`px-3 py-1.5 rounded-xl border text-xs font-medium transition-all flex items-center gap-1.5 ${c.bg} ${
                      color === c.key ? 'ring-2 ring-amber-500 font-bold scale-105' : 'opacity-80 hover:opacity-100'
                    }`}
                  >
                    <span>{c.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-amber-950 mb-1">
                Contenido del mensajito *
              </label>
              <textarea
                required
                rows={3}
                placeholder="Escribe lo que quieras expresarle hoy..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-4 py-2.5 bg-white rounded-xl border border-amber-200 text-xs sm:text-sm outline-none focus:border-amber-400 text-stone-900 resize-none"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-amber-950">
                <input
                  type="checkbox"
                  checked={pinned}
                  onChange={(e) => setPinned(e.target.checked)}
                  className="rounded text-amber-600 focus:ring-amber-500 w-4 h-4"
                />
                <span className="font-medium flex items-center gap-1">
                  <Pin className="w-3.5 h-3.5 text-amber-700" />
                  <span>Fijar arriba de la pizarra</span>
                </span>
              </label>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 text-xs text-stone-600 hover:text-stone-900 rounded-xl"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-500 hover:to-yellow-500 text-amber-950 font-semibold rounded-xl text-xs shadow-xs flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Pegar Nota en la Pizarra</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Grid of Notes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {notes.map((note) => {
          const colorClasses = getColorClasses(note.color);

          return (
            <div
              key={note.id}
              className={`relative rounded-2xl p-5 border shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between hover:-translate-y-1 ${colorClasses}`}
            >
              {/* Pin indicator */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/70 backdrop-blur-xs font-medium border border-black/5">
                  {note.tag}
                </span>

                <div className="flex items-center gap-1">
                  <button
                    onClick={(e) => togglePin(note.id, e)}
                    className={`p-1 rounded-full transition-colors ${
                      note.pinned ? 'text-amber-800 bg-amber-200/60' : 'text-stone-400 hover:text-amber-700'
                    }`}
                    title={note.pinned ? 'Desfijar' : 'Fijar arriba'}
                  >
                    <Pin className={`w-3.5 h-3.5 ${note.pinned ? 'fill-current' : ''}`} />
                  </button>

                  <button
                    onClick={(e) => handleDelete(note.id, e)}
                    className="p-1 rounded-full text-stone-400 hover:text-rose-600 transition-colors"
                    title="Eliminar nota"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Note Content */}
              <div className="my-2">
                <h5 className="font-serif font-bold text-base leading-snug mb-1">
                  {note.title}
                </h5>
                <p className="font-serif italic text-sm leading-relaxed whitespace-pre-line opacity-90">
                  "{note.content}"
                </p>
              </div>

              {/* Note Footer */}
              <div className="pt-3 mt-2 border-t border-black/5 flex items-center justify-between text-[11px] opacity-75">
                <span>{note.date}</span>
                <span className="font-serif font-bold">√-1♡U∞</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
