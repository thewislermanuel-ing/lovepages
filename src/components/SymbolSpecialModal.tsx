import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { SYMBOL_EXPLANATION, LOVE_SYMBOL, LOVE_AFFIRMATIONS } from '../data/content';
import { playLoveChime } from '../utils/audio';
import { X, Heart, Sparkles, Send } from 'lucide-react';
import { SunflowerSilhouette, LilySilhouette } from './FloralDecorations';

interface SymbolSpecialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SymbolSpecialModal: React.FC<SymbolSpecialModalProps> = ({ isOpen, onClose }) => {
  const [clickCount, setClickCount] = useState(0);
  const [currentAffirmation, setCurrentAffirmation] = useState(
    'Tú eres mi pensamiento favorito de cada día y mi refugio eterno.'
  );
  const [isSparkling, setIsSparkling] = useState(false);

  if (!isOpen) return null;

  const handleSendLove = () => {
    playLoveChime();
    setIsSparkling(true);
    setTimeout(() => setIsSparkling(false), 500);

    setClickCount((prev) => prev + 1);

    // Pick random affirmation
    const randomAff = LOVE_AFFIRMATIONS[Math.floor(Math.random() * LOVE_AFFIRMATIONS.length)];
    setCurrentAffirmation(randomAff);

    // Confetti celebration with soft golden and rose petals
    try {
      confetti({
        particleCount: 35,
        spread: 60,
        origin: { y: 0.65 },
        colors: ['#FDE047', '#F59E0B', '#F472B6', '#FEF08A', '#FBBF24'],
        shapes: ['circle'],
        scalar: 1.1,
      });
    } catch {
      // safe fallback
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-[#FFFDF9] border border-amber-200 rounded-3xl p-6 sm:p-8 shadow-2xl text-center overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle corner decorations */}
        <div className="absolute top-0 left-0 pointer-events-none opacity-20 -translate-x-6 -translate-y-6">
          <SunflowerSilhouette size={120} className="text-amber-500" />
        </div>
        <div className="absolute bottom-0 right-0 pointer-events-none opacity-20 translate-x-6 translate-y-6">
          <LilySilhouette size={120} className="text-amber-500" />
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-amber-100/60 transition-colors"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Big Signature Symbol */}
        <div className="my-2">
          <div
            className={`inline-block px-6 py-2.5 bg-gradient-to-r from-amber-100/90 via-yellow-100 to-amber-100/90 border border-amber-300 rounded-2xl shadow-xs transition-transform duration-300 ${
              isSparkling ? 'scale-110' : 'hover:scale-105'
            }`}
          >
            <span className="text-3xl sm:text-4xl font-serif font-bold text-amber-950 tracking-widest select-all">
              {LOVE_SYMBOL}
            </span>
          </div>
        </div>

        <h3 className="text-xl sm:text-2xl font-serif font-semibold text-amber-950 mt-3 mb-1">
          El Símbolo de Nuestro Amor
        </h3>
        <p className="text-xs text-amber-800/80 mb-6 font-medium italic">
          "{SYMBOL_EXPLANATION.fullMeaning}"
        </p>

        {/* Mathematical breakdown cards */}
        <div className="grid grid-cols-2 gap-2.5 text-left mb-6">
          {SYMBOL_EXPLANATION.parts.map((part) => (
            <div
              key={part.symbol}
              className="bg-white/80 border border-amber-100 rounded-xl p-3 hover:border-amber-300 transition-colors shadow-2xs"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="font-serif font-bold text-amber-900 text-lg w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center border border-amber-200/60 shrink-0">
                  {part.symbol}
                </span>
                <span className="text-xs font-semibold text-amber-950 leading-tight">
                  {part.meaning}
                </span>
              </div>
              <p className="text-[11px] text-stone-600 leading-snug">
                {part.detail}
              </p>
            </div>
          ))}
        </div>

        {/* Interactive Love Sender Affirmation Box */}
        <div className="bg-amber-50/70 border border-amber-200/70 rounded-2xl p-4 mb-6 relative">
          <div className="flex items-center justify-center gap-1.5 text-xs text-amber-800 font-medium mb-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Mensaje del corazón</span>
          </div>
          <p className="text-sm font-serif italic text-amber-950 min-h-[3rem] flex items-center justify-center">
            "{currentAffirmation}"
          </p>
        </div>

        {/* Action Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={handleSendLove}
            className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-500 hover:to-yellow-500 text-amber-950 font-medium rounded-xl shadow-sm hover:shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 text-sm"
          >
            <Heart className="w-4 h-4 fill-amber-950 text-amber-950" />
            <span>Presiona para enviarme amor infinito</span>
            <Send className="w-3.5 h-3.5 ml-1" />
          </button>
        </div>

        {clickCount > 0 && (
          <p className="text-xs text-amber-700/80 mt-3 tabular-nums">
            Has enviado <strong className="font-semibold text-amber-950">{clickCount}</strong> {clickCount === 1 ? 'dosis' : 'dosis'} de amor hoy ✨
          </p>
        )}
      </div>
    </div>
  );
};
