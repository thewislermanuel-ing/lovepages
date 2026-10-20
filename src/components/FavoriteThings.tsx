import React, { useState } from 'react';
import { FAVORITE_ACTIVITIES } from '../data/content';
import { FavoriteActivity } from '../types';
import { Sparkles, Palette, Waves, Flower2, UtensilsCrossed, Camera, HeartHandshake, CheckCircle2, Heart } from 'lucide-react';
import { playLoveChime } from '../utils/audio';

const iconMap: Record<string, React.ReactNode> = {
  Palette: <Palette className="w-5 h-5" />,
  Waves: <Waves className="w-5 h-5" />,
  Flower2: <Flower2 className="w-5 h-5" />,
  UtensilsCrossed: <UtensilsCrossed className="w-5 h-5" />,
  Camera: <Camera className="w-5 h-5" />,
  HeartHandshake: <HeartHandshake className="w-5 h-5" />,
};

export const FavoriteThings: React.FC = () => {
  const [selectedActivity, setSelectedActivity] = useState<FavoriteActivity | null>(null);
  const [plannedActivities, setPlannedActivities] = useState<Record<string, boolean>>({
    'fav-1': true,
    'fav-3': true,
  });

  const togglePlan = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playLoveChime();
    setPlannedActivities((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="space-y-8">
      {/* Category Header Banner with Cover Image */}
      <div className="relative rounded-3xl overflow-hidden border border-amber-200/80 bg-gradient-to-r from-amber-50 via-yellow-100/60 to-amber-100/40 p-6 sm:p-10 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-7 space-y-3">
            <div className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-800 tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Nuestras Citas & Pasiones</span>
            </div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-amber-950">
              Nuestras Cosas Favoritas para Hacer Juntos
            </h3>
            <p className="text-sm sm:text-base text-amber-900/70 leading-relaxed max-w-xl">
              No importa el lugar ni la hora: pintar vinilos en el suelo, escaparnos al agua, preparar dulces con corazones o simplemente quedarnos abrazados. Todo contigo es mi plan soñado.
            </p>
          </div>

          {/* Cover Preview Image: Painting Starry Night */}
          <div className="md:col-span-5 flex justify-center md:justify-end">
            <div className="relative bg-white p-3 pb-8 rounded-xl shadow-md border border-amber-200/70 rotate-1 hover:rotate-0 transition-transform duration-300 max-w-[270px]">
              <div className="aspect-square overflow-hidden rounded-lg bg-amber-100/50">
                <img
                  src="/assets/aistudio/image_73fecbc1.png"
                  alt="Portada Cosas Favoritas - Pintando Vinilos"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-3 text-center">
                <p className="font-serif text-sm font-semibold text-amber-950">Pintar Nuestro Universo</p>
                <p className="text-[11px] text-amber-800/70 italic">Arte, amor & noche estrellada</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Favorite Things */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {FAVORITE_ACTIVITIES.map((activity) => {
          const isPlanned = plannedActivities[activity.id];

          return (
            <div
              key={activity.id}
              onClick={() => {
                playLoveChime();
                setSelectedActivity(activity);
              }}
              className="group bg-white rounded-2xl overflow-hidden border border-amber-200/70 hover:border-amber-400 shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Media Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-amber-50">
                  <img
                    src={activity.imageUrl}
                    alt={activity.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-amber-400/90 text-amber-950 p-2 rounded-xl backdrop-blur-xs shadow-xs">
                    {iconMap[activity.iconName] || <Heart className="w-5 h-5" />}
                  </div>

                  <button
                    onClick={(e) => togglePlan(activity.id, e)}
                    className={`absolute top-3 right-3 px-3 py-1.5 rounded-full text-[11px] font-medium transition-all shadow-xs flex items-center gap-1 ${
                      isPlanned
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-white/90 text-stone-700 hover:bg-amber-100 border border-amber-200'
                    }`}
                  >
                    <CheckCircle2 className={`w-3.5 h-3.5 ${isPlanned ? 'text-emerald-600' : 'text-stone-400'}`} />
                    <span>{isPlanned ? '¡Plan pendiente!' : 'Planear cita'}</span>
                  </button>
                </div>

                {/* Content */}
                <div className="p-5">
                  <p className="text-xs text-amber-800 font-medium italic mb-1">
                    {activity.tagline}
                  </p>
                  <h4 className="font-serif text-xl font-bold text-amber-950 mb-2 group-hover:text-amber-800 transition-colors">
                    {activity.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {activity.description}
                  </p>
                </div>
              </div>

              {/* Footer reason */}
              <div className="px-5 pb-5 pt-3 border-t border-amber-100/70 bg-[#FFFDFB] text-[11px] text-amber-900/80">
                <span className="font-semibold text-amber-950">Por qué es especial: </span>
                <span>{activity.whySpecial}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail Dialog */}
      {selectedActivity && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in"
          onClick={() => setSelectedActivity(null)}
        >
          <div
            className="relative w-full max-w-lg bg-[#FFFDF9] border border-amber-200 rounded-3xl p-6 shadow-2xl text-left overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-[16/9] rounded-2xl overflow-hidden mb-4 bg-amber-50">
              <img
                src={selectedActivity.imageUrl}
                alt={selectedActivity.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 uppercase tracking-wider mb-1">
              <span>{selectedActivity.tagline}</span>
            </div>

            <h3 className="text-2xl font-serif font-bold text-amber-950 mb-2">
              {selectedActivity.title}
            </h3>

            <p className="text-sm text-stone-700 leading-relaxed mb-4">
              {selectedActivity.description}
            </p>

            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/60 mb-6 text-xs text-amber-900">
              <strong className="block mb-0.5 text-amber-950 font-semibold">Lo que siento al hacerlo contigo:</strong>
              {selectedActivity.whySpecial}
            </div>

            <div className="flex items-center justify-between">
              <span className="font-serif font-bold text-amber-900 text-sm">
                √-1♡U∞
              </span>
              <button
                onClick={() => setSelectedActivity(null)}
                className="px-5 py-2 bg-amber-400 hover:bg-amber-500 text-amber-950 font-medium rounded-xl text-xs transition-colors"
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
