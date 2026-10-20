import React, { useState, useEffect } from 'react';
import { RELATIONSHIP_START_DATE } from '../data/content';
import { Heart, Sparkles, Clock, Calendar } from 'lucide-react';
import { SunflowerSilhouette } from './FloralDecorations';

interface TimeElapsed {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalDays: number;
  totalHours: number;
}

export const LoveCounter: React.FC = () => {
  const [elapsed, setElapsed] = useState<TimeElapsed>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalDays: 0,
    totalHours: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      const start = new Date(RELATIONSHIP_START_DATE).getTime();
      const now = new Date().getTime();
      const diff = Math.max(0, now - start);

      const seconds = Math.floor((diff / 1000) % 60);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const totalHours = Math.floor(diff / (1000 * 60 * 60));

      setElapsed({
        days,
        hours,
        minutes,
        seconds,
        totalDays: days,
        totalHours,
      });
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FFFDF7] via-[#FEFCE8] to-[#FFFDF9] py-16 px-4 sm:px-6 lg:px-8 border-y border-amber-100">
      {/* Decorative floral watermark in background */}
      <div className="absolute -right-8 -bottom-8 pointer-events-none opacity-20">
        <SunflowerSilhouette size={180} className="text-amber-500" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Subtle romantic kicker */}
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 border border-amber-200/60 rounded-full mb-4">
          <Calendar className="w-3.5 h-3.5 text-amber-600" />
          <span className="text-xs font-medium tracking-wide text-amber-800">
            Nuestra Fecha Especial · 21 de Septiembre 2024
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#3D3222] font-semibold tracking-tight mb-3">
          Cada Segundo a Tu Lado es un Regalo
        </h2>
        <p className="text-base text-amber-900/70 max-w-xl mx-auto mb-10 leading-relaxed">
          Desde aquel día en que nuestros caminos se unieron para siempre, el tiempo solo ha hecho florecer este amor.
        </p>

        {/* Live Counter Display */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-3xl mx-auto">
          {/* Days */}
          <div className="bg-white/80 backdrop-blur-xs border border-amber-200/80 rounded-2xl p-5 shadow-xs transition-transform hover:-translate-y-1 duration-200">
            <span className="block text-4xl sm:text-5xl font-serif font-bold text-amber-900 tabular-nums">
              {elapsed.days}
            </span>
            <span className="block text-xs uppercase tracking-wider text-amber-700/80 font-medium mt-1">
              Días Juntos
            </span>
          </div>

          {/* Hours */}
          <div className="bg-white/80 backdrop-blur-xs border border-amber-200/80 rounded-2xl p-5 shadow-xs transition-transform hover:-translate-y-1 duration-200">
            <span className="block text-4xl sm:text-5xl font-serif font-bold text-amber-900 tabular-nums">
              {String(elapsed.hours).padStart(2, '0')}
            </span>
            <span className="block text-xs uppercase tracking-wider text-amber-700/80 font-medium mt-1">
              Horas
            </span>
          </div>

          {/* Minutes */}
          <div className="bg-white/80 backdrop-blur-xs border border-amber-200/80 rounded-2xl p-5 shadow-xs transition-transform hover:-translate-y-1 duration-200">
            <span className="block text-4xl sm:text-5xl font-serif font-bold text-amber-900 tabular-nums">
              {String(elapsed.minutes).padStart(2, '0')}
            </span>
            <span className="block text-xs uppercase tracking-wider text-amber-700/80 font-medium mt-1">
              Minutos
            </span>
          </div>

          {/* Seconds (live pulse) */}
          <div className="bg-gradient-to-br from-amber-50 to-yellow-100/60 border border-amber-300 rounded-2xl p-5 shadow-xs transition-transform hover:-translate-y-1 duration-200">
            <span className="block text-4xl sm:text-5xl font-serif font-bold text-amber-950 tabular-nums">
              {String(elapsed.seconds).padStart(2, '0')}
            </span>
            <span className="block text-xs uppercase tracking-wider text-amber-800 font-medium mt-1 flex items-center justify-center gap-1">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
              Segundos
            </span>
          </div>
        </div>

        {/* Meaningful milestone footers */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-amber-900/70">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            <span>Más de <strong className="tabular-nums font-semibold text-amber-900">{elapsed.totalHours.toLocaleString()}</strong> horas construyendo recuerdos</span>
          </div>
          <span className="hidden sm:inline" aria-hidden="true">·</span>
          <div className="flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>Y una eternidad por delante</span>
          </div>
          <span className="hidden sm:inline" aria-hidden="true">·</span>
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>√-1♡U∞ siempre</span>
          </div>
        </div>
      </div>
    </section>
  );
};
