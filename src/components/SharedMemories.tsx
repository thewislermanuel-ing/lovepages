import React, { useState } from 'react';
import { SHARED_MEMORIES } from '../data/content';
import { MemoryItem } from '../types';
import { Sparkles, Calendar, MapPin, Quote, Heart, ChevronDown } from 'lucide-react';
import { playLoveChime } from '../utils/audio';

export const SharedMemories: React.FC = () => {
  const [expandedMemoryId, setExpandedMemoryId] = useState<string | null>(SHARED_MEMORIES[0].id);

  const toggleExpand = (id: string) => {
    playLoveChime();
    setExpandedMemoryId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-10">
      {/* Category Header Banner with Cover Image */}
      <div className="relative rounded-3xl overflow-hidden border border-amber-200/80 bg-gradient-to-r from-yellow-50 via-amber-50/60 to-yellow-100/50 p-6 sm:p-10 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-7 space-y-3">
            <div className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-800 tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Nuestra Cronología Romántica</span>
            </div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-amber-950">
              Recuerdos que Llevo Tatuados en el Alma
            </h3>
            <p className="text-sm sm:text-base text-amber-900/70 leading-relaxed max-w-xl">
              Desde el 21 de septiembre del 2024, cada aventura, cada viaje y cada conversación hasta la madrugada ha construido este amor infinito.
            </p>
            <div className="pt-2 text-xs text-amber-800 font-medium flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-600" />
              <span>Desde el 21/09/2024 hasta el infinito (∞)</span>
            </div>
          </div>

          {/* Cover Polaroid Preview */}
          <div className="md:col-span-5 flex justify-center md:justify-end">
            <div className="relative bg-white p-3 pb-8 rounded-xl shadow-md border border-amber-200/60 -rotate-2 hover:rotate-0 transition-transform duration-300 max-w-[270px]">
              <div className="aspect-[4/3] overflow-hidden rounded-lg bg-amber-100/50">
                <img
                  src="/assets/aistudio/image_a9b72546.png"
                  alt="Portada de Recuerdos Polaroids con fechas"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-3 text-center">
                <p className="font-serif text-sm font-semibold text-amber-950">Nuestros Días Grabados</p>
                <p className="text-[11px] text-amber-800/70 italic">Fechas que nunca olvidaremos</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Timeline of Shared Memories */}
      <div className="relative max-w-4xl mx-auto space-y-6 before:absolute before:inset-0 before:left-4 sm:before:left-1/2 before:-translate-x-1/2 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-amber-200 before:via-amber-300 before:to-amber-100">
        {SHARED_MEMORIES.map((memory: MemoryItem, index: number) => {
          const isEven = index % 2 === 0;
          const isExpanded = expandedMemoryId === memory.id;

          return (
            <div
              key={memory.id}
              className={`relative flex flex-col sm:flex-row items-center gap-6 ${
                isEven ? 'sm:flex-row-reverse' : ''
              }`}
            >
              {/* Timeline Center Node */}
              <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-amber-100 border-2 border-amber-400 flex items-center justify-center z-10 shadow-xs">
                <Heart className="w-3.5 h-3.5 fill-amber-500 text-amber-600" />
              </div>

              {/* Memory Card */}
              <div className="ml-12 sm:ml-0 sm:w-1/2">
                <div
                  onClick={() => toggleExpand(memory.id)}
                  className={`bg-white rounded-2xl p-5 sm:p-6 border transition-all duration-300 cursor-pointer shadow-xs hover:shadow-md ${
                    isExpanded
                      ? 'border-amber-400 ring-2 ring-amber-200/50'
                      : 'border-amber-200/70 hover:border-amber-300'
                  }`}
                >
                  {/* Photo Thumbnail */}
                  <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-4 bg-amber-50">
                    <img
                      src={memory.imageUrl}
                      alt={memory.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full text-[11px] font-medium text-amber-900 border border-amber-200/60 shadow-2xs">
                      {memory.tag}
                    </div>
                  </div>

                  {/* Header info */}
                  <div className="flex items-center justify-between gap-2 text-xs text-amber-800 font-medium mb-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-amber-600" />
                      {memory.date}
                    </span>
                    <span className="flex items-center gap-1 text-stone-500">
                      <MapPin className="w-3.5 h-3.5 text-amber-600" />
                      {memory.location}
                    </span>
                  </div>

                  <h4 className="font-serif text-xl font-bold text-amber-950 mt-1 mb-2">
                    {memory.title}
                  </h4>

                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {memory.description}
                  </p>

                  {/* Quote & Expanded detail */}
                  {memory.quote && (
                    <div className="mt-4 pt-3 border-t border-amber-100 flex items-start gap-2 text-xs italic text-amber-900/80 bg-amber-50/50 p-3 rounded-xl">
                      <Quote className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <span>{memory.quote}</span>
                    </div>
                  )}

                  <div className="mt-3 flex items-center justify-between text-[11px] text-amber-800/70">
                    <span className="font-serif">√-1♡U∞</span>
                    <span className="flex items-center gap-1 text-amber-700 font-medium">
                      <span>{isExpanded ? 'Ver menos' : 'Toca para abrir'}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                      />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
