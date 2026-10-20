import React, { useState, useEffect } from 'react';
import { LoveLetter } from '../types';
import { INITIAL_LOVE_LETTERS, LOVE_SYMBOL } from '../data/content';
import { Mail, Plus, Sparkles, Send, Trash2, Heart, Eye, X } from 'lucide-react';
import { playEnvelopeSound, playLoveChime } from '../utils/audio';
import { SunflowerSilhouette, LilySilhouette } from './FloralDecorations';

const LOCAL_STORAGE_KEY = 'romantic_love_letters_v1';

export const LoveLettersSection: React.FC = () => {
  const [letters, setLetters] = useState<LoveLetter[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [activeLetter, setActiveLetter] = useState<LoveLetter | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('Tu novio para siempre');
  const [date, setDate] = useState('');
  const [content, setContent] = useState('');
  const [envelopeColor, setEnvelopeColor] = useState<LoveLetter['envelopeColor']>('golden');
  const [seal, setSeal] = useState<LoveLetter['seal']>('sunflower');

  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        setLetters(JSON.parse(stored));
      } else {
        setLetters(INITIAL_LOVE_LETTERS);
      }
    } catch {
      setLetters(INITIAL_LOVE_LETTERS);
    }
  }, []);

  const saveLetters = (updated: LoveLetter[]) => {
    setLetters(updated);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // safe fallback
    }
  };

  const handleAddLetter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    playLoveChime();
    const newLetter: LoveLetter = {
      id: `letter-${Date.now()}`,
      title: title.trim(),
      author: author.trim() || 'Tu novio para siempre',
      date: date.trim() || new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }),
      content: content.trim(),
      envelopeColor,
      seal,
      isPreloaded: false,
    };

    const updated = [newLetter, ...letters];
    saveLetters(updated);

    // Reset
    setTitle('');
    setContent('');
    setIsFormOpen(false);
    setActiveLetter(newLetter);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('¿Deseas eliminar esta carta?')) {
      const updated = letters.filter((l) => l.id !== id);
      saveLetters(updated);
      if (activeLetter?.id === id) {
        setActiveLetter(null);
      }
    }
  };

  const openLetter = (letter: LoveLetter) => {
    playEnvelopeSound();
    setActiveLetter(letter);
  };

  const getEnvelopeClasses = (color: LoveLetter['envelopeColor']) => {
    switch (color) {
      case 'rose':
        return 'from-rose-50 to-pink-100 border-rose-300 text-rose-950 shadow-rose-100/50';
      case 'cream':
        return 'from-amber-50 to-stone-100 border-amber-200 text-stone-900 shadow-stone-100/50';
      case 'golden':
      default:
        return 'from-amber-100/80 via-yellow-100 to-amber-200/70 border-amber-300 text-amber-950 shadow-amber-100/50';
    }
  };

  const getSealSymbol = (s: LoveLetter['seal']) => {
    switch (s) {
      case 'sunflower':
        return '🌻';
      case 'lily':
        return '⚜️';
      case 'heart':
        return '❤️';
      case 'infinity':
        return '∞';
      default:
        return '🌻';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-50 via-yellow-100/70 to-rose-50 border border-amber-200/80 rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100/80 text-amber-900 rounded-full text-xs font-semibold">
            <Mail className="w-3.5 h-3.5 text-amber-700" />
            <span>Apartado 3 · Buzón de Cartas Ilimitadas</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-amber-950">
            Redactar & Guardar Más Cartas Sin Límites
          </h3>
          <p className="text-xs sm:text-sm text-amber-900/70 max-w-xl">
            Cartas extensas, confesiones profundas y promesas para la posteridad. Elige tu sobre, el sello de cera floral y guarda tus cartas para leerlas juntos cuando quieran.
          </p>
        </div>

        <button
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="px-5 py-3 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-500 hover:to-yellow-500 text-amber-950 font-semibold rounded-2xl text-xs sm:text-sm shadow-xs hover:shadow-md transition-all active:scale-95 flex items-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>{isFormOpen ? 'Cerrar Redactor' : '➕ Redactar Nueva Carta'}</span>
        </button>
      </div>

      {/* Letter Composer Form */}
      {isFormOpen && (
        <div className="bg-[#FFFDF7] border-2 border-amber-300 rounded-3xl p-6 sm:p-8 shadow-lg animate-in slide-in-from-top-4 duration-200">
          <div className="flex items-center justify-between pb-3 mb-5 border-b border-amber-100">
            <h4 className="font-serif text-xl font-bold text-amber-950 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-600" />
              <span>Redactar Carta de Amor</span>
            </h4>
            <span className="text-xs font-serif text-amber-800">√-1♡U∞</span>
          </div>

          <form onSubmit={handleAddLetter} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-amber-950 mb-1">
                  Título de la Carta *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Para el amor de mi vida"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white rounded-xl border border-amber-200 text-xs sm:text-sm outline-none focus:border-amber-400 text-stone-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-amber-950 mb-1">
                  Firma / De parte de
                </label>
                <input
                  type="text"
                  placeholder="Ej: Tu novio enamorado"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white rounded-xl border border-amber-200 text-xs sm:text-sm outline-none focus:border-amber-400 text-stone-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-amber-950 mb-1">
                  Fecha o Dedicatoria
                </label>
                <input
                  type="text"
                  placeholder="Ej: 21 de Septiembre / Siempre"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white rounded-xl border border-amber-200 text-xs sm:text-sm outline-none focus:border-amber-400 text-stone-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Envelope Color */}
              <div>
                <label className="block text-xs font-semibold text-amber-950 mb-1.5">
                  Estilo de Sobre:
                </label>
                <div className="flex gap-2">
                  {[
                    { key: 'golden', label: 'Dorado Girasol' },
                    { key: 'rose', label: 'Rosa Tierno' },
                    { key: 'cream', label: 'Crema Marfil' },
                  ].map((env) => (
                    <button
                      key={env.key}
                      type="button"
                      onClick={() => setEnvelopeColor(env.key as typeof envelopeColor)}
                      className={`px-3 py-1.5 rounded-xl border text-xs font-medium transition-all ${
                        envelopeColor === env.key
                          ? 'bg-amber-300 border-amber-400 text-amber-950 font-bold shadow-2xs'
                          : 'bg-white border-amber-100 text-stone-600 hover:bg-amber-50'
                      }`}
                    >
                      {env.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Wax Seal */}
              <div>
                <label className="block text-xs font-semibold text-amber-950 mb-1.5">
                  Sello de Cera:
                </label>
                <div className="flex gap-2">
                  {[
                    { key: 'sunflower', label: '🌻 Girasol' },
                    { key: 'lily', label: '⚜️ Lirio' },
                    { key: 'heart', label: '❤️ Corazón' },
                    { key: 'infinity', label: '∞ Infinito' },
                  ].map((s) => (
                    <button
                      key={s.key}
                      type="button"
                      onClick={() => setSeal(s.key as typeof seal)}
                      className={`px-3 py-1.5 rounded-xl border text-xs font-medium transition-all ${
                        seal === s.key
                          ? 'bg-amber-300 border-amber-400 text-amber-950 font-bold shadow-2xs'
                          : 'bg-white border-amber-100 text-stone-600 hover:bg-amber-50'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-amber-950 mb-1">
                Cuerpo de la Carta *
              </label>
              <textarea
                required
                rows={5}
                placeholder="Escribe aquí con todo el amor de tu alma..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-4 py-3 bg-white rounded-xl border border-amber-200 text-xs sm:text-sm outline-none focus:border-amber-400 text-stone-900 leading-relaxed resize-none"
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
                <Send className="w-4 h-4" />
                <span>Sellar y Guardar Carta</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Grid of Envelopes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {letters.map((letter) => {
          const envelopeBg = getEnvelopeClasses(letter.envelopeColor);
          const sealSymbol = getSealSymbol(letter.seal);

          return (
            <div
              key={letter.id}
              onClick={() => openLetter(letter)}
              className={`group relative bg-gradient-to-b ${envelopeBg} rounded-3xl p-6 border shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between hover:-translate-y-1`}
            >
              <div>
                {/* Envelope flap aesthetic */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-full bg-white/90 border border-amber-300/80 flex items-center justify-center text-lg shadow-xs group-hover:scale-110 transition-transform">
                    {sealSymbol}
                  </div>
                  <span className="text-xs text-stone-600 font-medium">{letter.date}</span>
                </div>

                <h4 className="font-serif font-bold text-lg text-amber-950 mb-1 group-hover:text-amber-800 transition-colors">
                  {letter.title}
                </h4>

                <p className="text-xs text-amber-900/70 font-serif italic mb-3">
                  De: {letter.author}
                </p>

                <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed font-serif">
                  "{letter.content}"
                </p>
              </div>

              <div className="pt-4 mt-3 border-t border-black/5 flex items-center justify-between text-xs">
                <span className="font-medium text-amber-900 flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5 text-amber-700" />
                  <span>Abrir sobre</span>
                </span>

                {!letter.isPreloaded && (
                  <button
                    onClick={(e) => handleDelete(letter.id, e)}
                    className="p-1 text-stone-400 hover:text-rose-600 transition-colors"
                    title="Eliminar carta"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Letter Reading Parchment Modal */}
      {activeLetter && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-in fade-in"
          onClick={() => setActiveLetter(null)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[85vh] bg-[#FFFDF7] border-2 border-amber-300 rounded-3xl p-6 sm:p-10 shadow-2xl overflow-y-auto text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Background delicate silhouettes */}
            <div className="absolute top-0 right-0 pointer-events-none opacity-15">
              <SunflowerSilhouette size={180} className="text-amber-500" />
            </div>

            <button
              onClick={() => setActiveLetter(null)}
              className="absolute top-5 right-5 p-2 text-stone-400 hover:text-stone-800 rounded-full hover:bg-amber-100/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Letter Header */}
            <div className="border-b border-amber-200 pb-4 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{getSealSymbol(activeLetter.seal)}</span>
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-900">
                  Carta de Amor · {activeLetter.date}
                </span>
              </div>
              <h3 className="font-serif text-3xl font-bold text-amber-950">
                {activeLetter.title}
              </h3>
              <p className="font-serif italic text-sm text-amber-800/80 mt-1">
                De: {activeLetter.author}
              </p>
            </div>

            {/* Letter Content */}
            <div className="font-serif text-base sm:text-lg text-stone-800 leading-relaxed space-y-4 mb-8 whitespace-pre-line bg-amber-50/50 p-6 rounded-2xl border border-amber-100">
              {activeLetter.content}
            </div>

            {/* Letter Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-amber-100">
              <div className="flex items-center gap-1.5 text-xs text-amber-900 font-serif italic">
                <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                <span>{LOVE_SYMBOL} para siempre</span>
              </div>

              <button
                onClick={() => setActiveLetter(null)}
                className="px-5 py-2 bg-amber-400 hover:bg-amber-500 text-amber-950 font-medium rounded-xl text-xs transition-colors"
              >
                Guardar carta
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
