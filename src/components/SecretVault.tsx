import React, { useState, useEffect } from 'react';
import { INITIAL_SECRET_NOTES, LOVE_SYMBOL } from '../data/content';
import { SecretNote } from '../types';
import { Lock, Unlock, KeyRound, Plus, Trash2, Heart, Sparkles, Send, Eye, EyeOff } from 'lucide-react';
import { playEnvelopeSound, playLoveChime } from '../utils/audio';
import { SunflowerSilhouette, LilySilhouette } from './FloralDecorations';

const LOCAL_STORAGE_KEY = 'secret_romantic_notes_v1';

export const SecretVault: React.FC = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState(false);
  const [notes, setNotes] = useState<SecretNote[]>([]);
  const [activeNote, setActiveNote] = useState<SecretNote | null>(null);

  // Form states for adding new note
  const [isCreating, setIsCreating] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newIcon, setNewIcon] = useState<'sunflower' | 'lily' | 'heart' | 'infinity'>('sunflower');

  // Load from localStorage or initialize with preloaded notes
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        setNotes(JSON.parse(stored));
      } else {
        setNotes(INITIAL_SECRET_NOTES);
      }
    } catch {
      setNotes(INITIAL_SECRET_NOTES);
    }
  }, []);

  // Save notes to localStorage
  const saveNotes = (updated: SecretNote[]) => {
    setNotes(updated);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // safe fallback
    }
  };

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    // Special anniversary date: 2109 or 21/09 or 21092024 or quick unlock
    const clean = passcode.trim().replace(/\D/g, '');
    if (clean === '2109' || clean === '21092024' || clean === '21' || passcode.toLowerCase() === 'amor') {
      playLoveChime();
      setIsUnlocked(true);
      setPasscodeError(false);
    } else {
      setPasscodeError(true);
      setTimeout(() => setPasscodeError(false), 2500);
    }
  };

  const handleQuickUnlock = () => {
    playLoveChime();
    setIsUnlocked(true);
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    playLoveChime();
    const newNote: SecretNote = {
      id: `note-${Date.now()}`,
      title: newTitle.trim(),
      content: newContent.trim(),
      date: new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' }),
      icon: newIcon,
      isPreloaded: false,
    };

    const updated = [newNote, ...notes];
    saveNotes(updated);
    setNewTitle('');
    setNewContent('');
    setIsCreating(false);
    setActiveNote(newNote);
  };

  const handleDeleteNote = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('¿Seguro que deseas borrar esta nota secreta?')) {
      const updated = notes.filter((n) => n.id !== id);
      saveNotes(updated);
      if (activeNote?.id === id) {
        setActiveNote(null);
      }
    }
  };

  const openNote = (note: SecretNote) => {
    playEnvelopeSound();
    setActiveNote(note);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Category Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100/70 text-amber-900 rounded-full text-xs font-semibold">
          <KeyRound className="w-3.5 h-3.5 text-amber-700" />
          <span>Rincón Oculto & Privado</span>
        </div>
        <h3 className="text-3xl sm:text-4xl font-serif font-bold text-amber-950">
          El Cofre de Nuestras Notas Secretas
        </h3>
        <p className="text-sm text-amber-900/70 max-w-lg mx-auto">
          Un espacio protegido donde solo tú y yo podemos escribir y leer las confesiones más profundas que guardamos en el corazón.
        </p>
      </div>

      {!isUnlocked ? (
        /* Locked View */
        <div className="relative bg-gradient-to-b from-amber-50/60 to-yellow-50/40 border border-amber-200/80 rounded-3xl p-8 sm:p-12 text-center max-w-md mx-auto shadow-sm">
          <div className="w-16 h-16 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center mx-auto mb-4 text-amber-800 shadow-xs">
            <Lock className="w-8 h-8" />
          </div>

          <h4 className="text-xl font-serif font-bold text-amber-950 mb-1">
            Cofre Protegido con Amor
          </h4>
          <p className="text-xs text-stone-600 mb-6 leading-relaxed">
            Ingresa nuestra fecha especial para abrir el candado (Día y mes de nuestro aniversario: <strong>2109</strong>).
          </p>

          <form onSubmit={handleUnlock} className="space-y-4">
            <div>
              <input
                type="password"
                placeholder="Código secreto (Ej: 2109)"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className={`w-full px-4 py-3 bg-white rounded-xl border text-center text-sm font-medium tracking-widest outline-none transition-colors ${
                  passcodeError
                    ? 'border-rose-400 bg-rose-50 text-rose-900 ring-2 ring-rose-200'
                    : 'border-amber-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 text-amber-950'
                }`}
              />
              {passcodeError && (
                <p className="text-[11px] text-rose-600 font-medium mt-1">
                  Código incorrecto. Pista: Es nuestra fecha especial (21 de septiembre = 2109)
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-500 hover:to-yellow-500 text-amber-950 font-medium rounded-xl text-sm shadow-xs transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <Unlock className="w-4 h-4" />
                <span>Desbloquear Cofre</span>
              </button>

              <button
                type="button"
                onClick={handleQuickUnlock}
                className="text-xs text-amber-800 hover:text-amber-950 underline underline-offset-2 py-1"
              >
                ¿Quieres entrar directo? Toca aquí mi amor
              </button>
            </div>
          </form>
        </div>
      ) : (
        /* Unlocked Secret Vault */
        <div className="space-y-8 animate-in fade-in duration-300">
          {/* Vault Top Bar */}
          <div className="flex items-center justify-between bg-amber-100/60 border border-amber-200/80 rounded-2xl px-5 py-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-950">
              <Unlock className="w-4 h-4 text-emerald-600" />
              <span>Cofre Abierto · {notes.length} cartas guardadas</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsCreating(true)}
                className="px-3.5 py-1.5 bg-amber-400 hover:bg-amber-500 text-amber-950 font-medium rounded-xl text-xs shadow-xs transition-colors flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Escribir Nueva Nota</span>
              </button>

              <button
                onClick={() => {
                  setIsUnlocked(false);
                  setActiveNote(null);
                }}
                className="px-3 py-1.5 bg-white/80 hover:bg-white text-stone-600 hover:text-stone-900 rounded-xl text-xs border border-amber-200 transition-colors flex items-center gap-1"
                title="Volver a cerrar el cofre"
              >
                <Lock className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Cerrar</span>
              </button>
            </div>
          </div>

          {/* Form to Write a New Secret Note */}
          {isCreating && (
            <div className="bg-[#FFFDF7] border-2 border-amber-300 rounded-3xl p-6 shadow-md animate-in slide-in-from-top-4 duration-200">
              <h4 className="text-xl font-serif font-bold text-amber-950 mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-600" />
                <span>Escribir una Nueva Nota Secreta para Ti</span>
              </h4>

              <form onSubmit={handleAddNote} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-amber-900 mb-1">
                    Título o Dedicatoria de la Carta
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: Lo que sentí cuando me miraste hoy..."
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white rounded-xl border border-amber-200 text-sm outline-none focus:border-amber-400 text-stone-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-amber-900 mb-1">
                    Elige el Sello de la Carta
                  </label>
                  <div className="flex gap-2">
                    {[
                      { key: 'sunflower', label: '🌻 Girasol' },
                      { key: 'lily', label: '⚜️ Lirio' },
                      { key: 'heart', label: '❤️ Corazón' },
                      { key: 'infinity', label: '♾️ √-1♡U∞' },
                    ].map((icon) => (
                      <button
                        key={icon.key}
                        type="button"
                        onClick={() => setNewIcon(icon.key as typeof newIcon)}
                        className={`px-3 py-1.5 text-xs rounded-xl border transition-all ${
                          newIcon === icon.key
                            ? 'bg-amber-300 text-amber-950 font-semibold border-amber-400 shadow-2xs'
                            : 'bg-white text-stone-600 border-amber-100 hover:bg-amber-50'
                        }`}
                      >
                        {icon.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-amber-900 mb-1">
                    Contenido Íntimo & Palabras de Amor
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Escribe aquí todo lo que quieras decirle en secreto..."
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    className="w-full px-4 py-3 bg-white rounded-xl border border-amber-200 text-sm outline-none focus:border-amber-400 text-stone-900 leading-relaxed resize-none"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsCreating(false)}
                    className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900 rounded-xl"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-500 hover:to-yellow-500 text-amber-950 font-semibold rounded-xl text-xs shadow-xs flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Guardar en el Cofre</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Grid of Envelopes / Letters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {notes.map((note) => {
              const isSelected = activeNote?.id === note.id;

              return (
                <div
                  key={note.id}
                  onClick={() => openNote(note)}
                  className={`group relative bg-[#FFFDF7] rounded-2xl p-5 border cursor-pointer transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 ${
                    isSelected
                      ? 'border-amber-400 ring-2 ring-amber-300 shadow-md'
                      : 'border-amber-200/80 hover:border-amber-400 shadow-xs hover:shadow-md'
                  }`}
                >
                  <div>
                    {/* Top wax seal emblem */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-8 h-8 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-800 text-xs font-bold shadow-2xs">
                        {note.icon === 'sunflower' && '🌻'}
                        {note.icon === 'lily' && '⚜️'}
                        {note.icon === 'heart' && '❤️'}
                        {note.icon === 'infinity' && '∞'}
                      </div>
                      <span className="text-[11px] text-amber-800/70 font-medium">
                        {note.date}
                      </span>
                    </div>

                    <h5 className="font-serif text-lg font-bold text-amber-950 mb-1 group-hover:text-amber-800 transition-colors">
                      {note.title}
                    </h5>

                    <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed font-serif italic">
                      "{note.content}"
                    </p>
                  </div>

                  <div className="pt-4 mt-3 border-t border-amber-100 flex items-center justify-between text-[11px]">
                    <span className="text-amber-800 font-medium flex items-center gap-1">
                      <Eye className="w-3 h-3 text-amber-600" />
                      <span>Leer carta completa</span>
                    </span>

                    {!note.isPreloaded && (
                      <button
                        onClick={(e) => handleDeleteNote(note.id, e)}
                        className="text-stone-400 hover:text-rose-600 p-1 rounded-md transition-colors"
                        title="Borrar nota"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Letter Reader Modal / Parchment */}
          {activeNote && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in"
              onClick={() => setActiveNote(null)}
            >
              <div
                className="relative w-full max-w-xl bg-[#FFFDF7] border-2 border-amber-300 rounded-3xl p-6 sm:p-10 shadow-2xl text-left overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Background decorative flower */}
                <div className="absolute -bottom-10 -right-10 pointer-events-none opacity-15">
                  <SunflowerSilhouette size={180} className="text-amber-500" />
                </div>

                <div className="flex items-center justify-between border-b border-amber-200 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">
                      {activeNote.icon === 'sunflower' && '🌻'}
                      {activeNote.icon === 'lily' && '⚜️'}
                      {activeNote.icon === 'heart' && '❤️'}
                      {activeNote.icon === 'infinity' && '♾️'}
                    </span>
                    <span className="text-xs font-semibold text-amber-900 uppercase tracking-wider">
                      Nota Secreta · {activeNote.date}
                    </span>
                  </div>
                  <span className="font-serif font-bold text-amber-800 text-sm">
                    {LOVE_SYMBOL}
                  </span>
                </div>

                <h3 className="text-2xl font-serif font-bold text-amber-950 mb-4">
                  {activeNote.title}
                </h3>

                <div className="font-serif text-base sm:text-lg text-stone-800 leading-relaxed space-y-4 mb-8 whitespace-pre-line bg-amber-50/40 p-5 rounded-2xl border border-amber-100">
                  {activeNote.content}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-amber-900 font-serif italic">
                    <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                    <span>Guardado con amor en nuestro cofre eterno</span>
                  </div>

                  <button
                    onClick={() => setActiveNote(null)}
                    className="px-5 py-2 bg-amber-400 hover:bg-amber-500 text-amber-950 font-medium rounded-xl text-xs transition-colors"
                  >
                    Guardar carta
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
