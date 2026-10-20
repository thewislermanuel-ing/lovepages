import React, { useState } from 'react';
import { LOVE_AFFIRMATIONS, LOVE_SYMBOL, SYMBOL_EXPLANATION } from '../data/content';
import { Heart, Sparkles, Trophy, Award, Gift, RefreshCw } from 'lucide-react';
import { playLoveChime } from '../utils/audio';
import confetti from 'canvas-confetti';
import { SunflowerSilhouette, LilySilhouette } from './FloralDecorations';

export const LoveMessages: React.FC = () => {
  const [currentAffirmationIndex, setCurrentAffirmationIndex] = useState(0);
  const [trophyAwarded, setTrophyAwarded] = useState(false);
  const [trophyClicks, setTrophyClicks] = useState(1);

  const nextAffirmation = () => {
    playLoveChime();
    setCurrentAffirmationIndex((prev) => (prev + 1) % LOVE_AFFIRMATIONS.length);
  };

  const handleTrophyClaim = () => {
    playLoveChime();
    setTrophyAwarded(true);
    setTrophyClicks((prev) => prev + 1);

    try {
      confetti({
        particleCount: 45,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FACC15', '#F59E0B', '#F472B6', '#FBBF24'],
      });
    } catch {
      // safe fallback
    }
  };

  return (
    <div className="space-y-10">
      {/* Category Header Banner with Cover Image */}
      <div className="relative rounded-3xl overflow-hidden border border-amber-200/80 bg-gradient-to-r from-amber-50 via-yellow-100/50 to-amber-100/40 p-6 sm:p-10 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-7 space-y-3">
            <div className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-800 tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Palabras del Alma</span>
            </div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-amber-950">
              Cartas & Mensajes de Amor Personalizados
            </h3>
            <p className="text-sm sm:text-base text-amber-900/70 leading-relaxed max-w-xl">
              Porque a veces las palabras quedan cortas para expresar todo lo que provocas en mí. Aquí están los sentimientos que florecen en mi pecho cada día.
            </p>
          </div>

          {/* Cover Preview Image: Intimate Cheek Kiss */}
          <div className="md:col-span-5 flex justify-center md:justify-end">
            <div className="relative bg-white p-3 pb-8 rounded-xl shadow-md border border-amber-200/70 -rotate-1 hover:rotate-0 transition-transform duration-300 max-w-[270px]">
              <div className="aspect-[4/3] overflow-hidden rounded-lg bg-amber-100/50">
                <img
                  src="/assets/aistudio/image_eae802ff.png"
                  alt="Portada Mensajes de Amor - Beso Tierno"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-3 text-center">
                <p className="font-serif text-sm font-semibold text-amber-950">El Beso Más Dulce</p>
                <p className="text-[11px] text-amber-800/70 italic">Amor sincero & eterno</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Love Letter */}
      <div className="relative bg-[#FFFDF7] border border-amber-200/80 rounded-3xl p-6 sm:p-10 shadow-xs max-w-3xl mx-auto overflow-hidden">
        {/* Subtle background silhouettes */}
        <div className="absolute top-0 right-0 pointer-events-none opacity-15">
          <SunflowerSilhouette size={160} className="text-amber-500" />
        </div>
        <div className="absolute bottom-0 left-0 pointer-events-none opacity-15">
          <LilySilhouette size={140} className="text-amber-500" />
        </div>

        <div className="relative z-10 space-y-4">
          <div className="flex items-center justify-between border-b border-amber-100 pb-4">
            <span className="font-serif italic text-amber-800 text-lg">Para la dueña de mi corazón,</span>
            <span className="text-xs text-amber-700/80 font-medium">Desde el 21 · 09 · 2024</span>
          </div>

          <div className="font-serif text-base sm:text-lg text-[#3A332A] leading-relaxed space-y-4 pt-2">
            <p>
              Mi amor, no sé en qué constelación estaba alineado el destino cuando te cruzaste en mi camino, pero daría mi vida mil veces por volver a encontrarte.
            </p>
            <p>
              Amo tus ojos cuando me miran con dulzura, amo cuando sacas la lengua con ese ramo gigante de girasoles, amo nuestras risas tontas en el río, y amo cómo dos platos de vinilo se convirtieron en nuestra propia Noche Estrellada.
            </p>
            <p>
              Por eso inventamos <strong className="font-semibold text-amber-900">{LOVE_SYMBOL}</strong>: porque ningún número ordinario bastaba para cuantificar lo que siento por ti. Es infinito, real e indestructible.
            </p>
          </div>

          <div className="pt-6 border-t border-amber-100 flex items-center justify-between text-xs">
            <span className="font-serif italic text-amber-900 text-base">Siempre tuyo, infinitamente.</span>
            <div className="flex items-center gap-1 text-amber-700 font-serif font-bold text-sm">
              <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
              <span>{LOVE_SYMBOL}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive #1 Trophy Showcase Section */}
      <div className="bg-gradient-to-r from-yellow-50 via-amber-50/80 to-yellow-100/60 rounded-3xl p-6 sm:p-8 border border-amber-300 max-w-3xl mx-auto shadow-xs">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="w-36 h-36 shrink-0 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-md bg-white p-2">
            <img
              src="/assets/aistudio/image_2f085ec6.png"
              alt="Trofeo #1 Novia Más Preciosa del Mundo"
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain"
            />
          </div>

          <div className="flex-1 text-center sm:text-left space-y-2">
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-amber-200/70 text-amber-950 rounded-full text-xs font-semibold">
              <Trophy className="w-3.5 h-3.5 text-amber-800" />
              <span>Premio Oficial Incondicional</span>
            </div>
            <h4 className="text-xl sm:text-2xl font-serif font-bold text-amber-950">
              #1 Novia Más Preciosa del Mundo
            </h4>
            <p className="text-xs sm:text-sm text-amber-900/80 leading-relaxed">
              Este galardón te pertenece por derecho indiscutible. Eres la más linda, comprensiva, divertida y tierna de todas.
            </p>

            <div className="pt-2">
              <button
                onClick={handleTrophyClaim}
                className="px-4 py-2 bg-amber-400 hover:bg-amber-500 text-amber-950 rounded-xl font-medium text-xs shadow-xs hover:shadow-md transition-all active:scale-95 flex items-center gap-1.5 mx-auto sm:mx-0"
              >
                <Award className="w-4 h-4" />
                <span>¡Reclamar caricia & trofeo! (x{trophyClicks})</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Love Note Dispenser */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200 max-w-2xl mx-auto text-center shadow-xs">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 mb-3">
          <Gift className="w-6 h-6" />
        </div>
        <h4 className="text-xl font-serif font-bold text-amber-950 mb-1">
          Dispensador de Notas de Amor
        </h4>
        <p className="text-xs text-stone-500 mb-6">
          Presiona el botón para descubrir un mensaje nuevo para ti cada día.
        </p>

        <div className="min-h-[4rem] flex items-center justify-center p-4 bg-amber-50/80 rounded-2xl border border-amber-200/60 mb-6">
          <p className="font-serif italic text-base sm:text-lg text-amber-950 animate-in fade-in duration-300">
            "{LOVE_AFFIRMATIONS[currentAffirmationIndex]}"
          </p>
        </div>

        <button
          onClick={nextAffirmation}
          className="px-5 py-2.5 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-500 hover:to-yellow-500 text-amber-950 font-medium rounded-xl text-xs shadow-xs hover:shadow-md transition-all flex items-center gap-2 mx-auto"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Sacar otro mensaje de amor</span>
        </button>
      </div>
    </div>
  );
};
