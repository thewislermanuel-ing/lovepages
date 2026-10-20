import React, { useState, useEffect, useCallback } from 'react';
import {
  LOVE_SYMBOL,
  ROMANTIC_CLICK_MESSAGES,
} from './data/content';
import { GalleryPhoto } from './types';
import { LoveCounter } from './components/LoveCounter';
import { PhotoGallery } from './components/PhotoGallery';
import { SharedMemories } from './components/SharedMemories';
import { FavoriteThings } from './components/FavoriteThings';
import { LoveMessages } from './components/LoveMessages';
import { SecretVault } from './components/SecretVault';
import { PhotoUploaderSection } from './components/PhotoUploaderSection';
import { QuickNotesSection } from './components/QuickNotesSection';
import { LoveLettersSection } from './components/LoveLettersSection';
import { SymbolSpecialModal } from './components/SymbolSpecialModal';
import { PromptViewerModal } from './components/PromptViewerModal';
import { RomanticAudioPlayer } from './components/RomanticAudioPlayer';
import { SunflowerSilhouette, LilySilhouette } from './components/FloralDecorations';
import {
  Heart,
  Sparkles,
  Image,
  BookHeart,
  Star,
  Mail,
  Lock,
  FileText,
  Camera,
  StickyNote,
} from 'lucide-react';
import { playLoveChime } from './utils/audio';

interface FloatingClickParticle {
  id: number;
  x: number;
  y: number;
  char: string;
}

type TabType =
  | 'galeria'
  | 'recuerdos'
  | 'favoritos'
  | 'mensajes'
  | 'secreto'
  | 'add-fotos'
  | 'add-notas'
  | 'add-cartas';

const CUSTOM_PHOTOS_STORAGE_KEY = 'custom_gallery_photos_v1';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('galeria');
  const [customPhotos, setCustomPhotos] = useState<GalleryPhoto[]>([]);
  const [currentLoveToast, setCurrentLoveToast] = useState<string>(
    'Cada segundo a tu lado desde el 21 de septiembre de 2024 es mi mayor tesoro.'
  );
  const [isSymbolModalOpen, setIsSymbolModalOpen] = useState(false);
  const [isPromptModalOpen, setIsPromptModalOpen] = useState(false);
  const [particles, setParticles] = useState<FloatingClickParticle[]>([]);

  // Load custom photos from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CUSTOM_PHOTOS_STORAGE_KEY);
      if (stored) {
        setCustomPhotos(JSON.parse(stored));
      }
    } catch {
      // safe fallback
    }
  }, []);

  const saveCustomPhotos = (photos: GalleryPhoto[]) => {
    setCustomPhotos(photos);
    try {
      localStorage.setItem(CUSTOM_PHOTOS_STORAGE_KEY, JSON.stringify(photos));
    } catch {
      // safe fallback
    }
  };

  const handleAddCustomPhoto = (photo: GalleryPhoto) => {
    const updated = [photo, ...customPhotos];
    saveCustomPhotos(updated);
  };

  const handleDeleteCustomPhoto = (id: string) => {
    const updated = customPhotos.filter((p) => p.id !== id);
    saveCustomPhotos(updated);
  };

  // Spawn floating heart or petal on click anywhere
  const handleGlobalClick = useCallback((e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT') return;

    const symbols = ['♡', '🌻', '✨', '💛', '∞'];
    const chosen = symbols[Math.floor(Math.random() * symbols.length)];

    const newParticle: FloatingClickParticle = {
      id: Date.now() + Math.random(),
      x: e.clientX,
      y: e.clientY,
      char: chosen,
    };

    setParticles((prev) => [...prev.slice(-15), newParticle]);

    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
    }, 1200);
  }, []);

  const handleTabChange = (tabKey: TabType) => {
    playLoveChime();
    setActiveTab(tabKey);

    // Pick a tailored romantic message for this section
    const list = ROMANTIC_CLICK_MESSAGES[tabKey] || ROMANTIC_CLICK_MESSAGES.inicio;
    const randomMsg = list[Math.floor(Math.random() * list.length)];
    setCurrentLoveToast(randomMsg);
  };

  const openSymbolModal = () => {
    playLoveChime();
    setIsSymbolModalOpen(true);
  };

  return (
    <div
      onClick={handleGlobalClick}
      className="min-h-screen bg-[#FFFDF9] text-[#2D2A26] flex flex-col relative selection:bg-[#FEF08A] selection:text-[#78350F] overflow-x-hidden"
    >
      {/* Floating Click Particles */}
      {particles.map((p) => (
        <span
          key={p.id}
          className="fixed pointer-events-none select-none text-base sm:text-lg z-50 animate-out fade-out slide-out-to-top-8 duration-1000"
          style={{
            left: `${p.x}px`,
            top: `${p.y - 12}px`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          {p.char}
        </span>
      ))}

      {/* Decorative Sunflower & Lily Silhouettes in Background */}
      <div className="fixed top-0 left-0 w-72 h-72 pointer-events-none opacity-20 select-none z-0">
        <SunflowerSilhouette size={220} className="absolute -top-12 -left-12 text-amber-400" />
        <LilySilhouette size={160} className="absolute top-20 left-24 text-amber-500/40" />
      </div>

      <div className="fixed bottom-0 right-0 w-80 h-80 pointer-events-none opacity-20 select-none z-0">
        <SunflowerSilhouette size={240} className="absolute -bottom-16 -right-16 text-amber-400" />
        <LilySilhouette size={180} className="absolute bottom-24 right-28 text-amber-500/40" />
      </div>

      {/* TOP NAVIGATION BAR (One-row, three-zone contract) */}
      <header className="sticky top-0 z-40 bg-[#FFFDF9]/90 backdrop-blur-md border-b border-amber-200/70 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Zone 1: Single text wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => handleTabChange('galeria')}
            className="flex items-center gap-2 text-left group"
          >
            <span className="w-8 h-8 rounded-full bg-amber-100/80 border border-amber-300 flex items-center justify-center text-amber-800 text-sm font-bold shadow-2xs group-hover:scale-105 transition-transform">
              🌻
            </span>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-serif font-bold text-amber-950 tracking-tight whitespace-nowrap">
                Nuestra Historia
              </span>
              <span className="text-[10px] text-amber-800/80 font-mono tracking-wider -mt-1">
                21 · 09 · 2024
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-5 text-xs sm:text-sm font-medium text-stone-600">
          <button
            onClick={() => handleTabChange('galeria')}
            className={`transition-colors whitespace-nowrap py-1 relative ${
              activeTab === 'galeria' ? 'text-amber-950 font-semibold' : 'hover:text-amber-900'
            }`}
          >
            Galería
            {activeTab === 'galeria' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-400 rounded-full" />
            )}
          </button>

          <button
            onClick={() => handleTabChange('recuerdos')}
            className={`transition-colors whitespace-nowrap py-1 relative ${
              activeTab === 'recuerdos' ? 'text-amber-950 font-semibold' : 'hover:text-amber-900'
            }`}
          >
            Recuerdos Compartidos
            {activeTab === 'recuerdos' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-400 rounded-full" />
            )}
          </button>

          <button
            onClick={() => handleTabChange('favoritos')}
            className={`transition-colors whitespace-nowrap py-1 relative ${
              activeTab === 'favoritos' ? 'text-amber-950 font-semibold' : 'hover:text-amber-900'
            }`}
          >
            Cosas Favoritas
            {activeTab === 'favoritos' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-400 rounded-full" />
            )}
          </button>

          <button
            onClick={() => handleTabChange('mensajes')}
            className={`transition-colors whitespace-nowrap py-1 relative ${
              activeTab === 'mensajes' ? 'text-amber-950 font-semibold' : 'hover:text-amber-900'
            }`}
          >
            Cartas & Trofeo
            {activeTab === 'mensajes' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-400 rounded-full" />
            )}
          </button>

          <button
            onClick={() => handleTabChange('secreto')}
            className={`transition-colors whitespace-nowrap py-1 relative flex items-center gap-1 ${
              activeTab === 'secreto' ? 'text-amber-950 font-semibold' : 'hover:text-amber-900'
            }`}
          >
            <Lock className="w-3 h-3 text-amber-600" />
            <span>Notas Secretas</span>
            {activeTab === 'secreto' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-400 rounded-full" />
            )}
          </button>

          {/* Quick Creator Tabs */}
          <span className="text-amber-300" aria-hidden="true">|</span>

          <button
            onClick={() => handleTabChange('add-fotos')}
            className={`transition-colors whitespace-nowrap py-1 relative text-xs font-semibold ${
              activeTab === 'add-fotos' ? 'text-amber-950' : 'text-amber-800/80 hover:text-amber-950'
            }`}
          >
            + Fotos
            {activeTab === 'add-fotos' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-400 rounded-full" />
            )}
          </button>

          <button
            onClick={() => handleTabChange('add-notas')}
            className={`transition-colors whitespace-nowrap py-1 relative text-xs font-semibold ${
              activeTab === 'add-notas' ? 'text-amber-950' : 'text-amber-800/80 hover:text-amber-950'
            }`}
          >
            + Notas
            {activeTab === 'add-notas' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-400 rounded-full" />
            )}
          </button>

          <button
            onClick={() => handleTabChange('add-cartas')}
            className={`transition-colors whitespace-nowrap py-1 relative text-xs font-semibold ${
              activeTab === 'add-cartas' ? 'text-amber-950' : 'text-amber-800/80 hover:text-amber-950'
            }`}
          >
            + Cartas
            {activeTab === 'add-cartas' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-400 rounded-full" />
            )}
          </button>
        </nav>

        {/* Zone 3: Primary Actions (Interactive Symbol Button + Audio Player) */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <RomanticAudioPlayer />

          <button
            onClick={openSymbolModal}
            className="group px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-amber-300 via-yellow-300 to-amber-300 hover:from-amber-400 hover:to-yellow-400 text-amber-950 rounded-xl text-xs sm:text-sm font-serif font-bold tracking-wider shadow-xs hover:shadow-md transition-all active:scale-95 flex items-center gap-1.5 border border-amber-400/60"
            title="Presiona para descubrir nuestro símbolo de amor"
          >
            <Heart className="w-3.5 h-3.5 fill-amber-900 text-amber-900 animate-pulse" />
            <span>{LOVE_SYMBOL}</span>
          </button>
        </div>
      </header>

      {/* Floating Interactive Love Message Banner (Toast from clicks) */}
      <div className="relative z-30 max-w-4xl mx-auto w-full px-4 pt-4">
        <div className="bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-50 border border-amber-200/90 rounded-2xl p-3 sm:p-4 text-center shadow-xs flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-600 shrink-0 animate-spin" style={{ animationDuration: '6s' }} />
          <p className="font-serif italic text-xs sm:text-sm text-amber-950 leading-snug">
            "{currentLoveToast}"
          </p>
        </div>
      </div>

      {/* HERO SECTION */}
      <section className="relative pt-8 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Hero Left Column */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            {/* Romantic Kicker */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-800 bg-amber-100/70 border border-amber-200/80 px-3.5 py-1 rounded-full">
              <span>Para la Dueña de Mi Corazón</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono">{LOVE_SYMBOL}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-amber-950 tracking-tight leading-[1.15]">
              Amarte es lo más hermoso que me ha pasado en la vida
            </h1>

            <p className="text-base sm:text-lg text-stone-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans">
              Esta página es un rincón sagrado para nosotros dos. Un refugio donde viven nuestros días en el río, los viajes en altamar, las tardes pintando vinilos, tus sonrisas con girasoles y las promesas que durarán hasta el infinito.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <button
                onClick={openSymbolModal}
                className="px-6 py-3 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-500 hover:to-yellow-500 text-amber-950 font-semibold rounded-2xl text-sm shadow-xs hover:shadow-md transition-all active:scale-95 flex items-center gap-2"
              >
                <Heart className="w-4 h-4 fill-amber-950 text-amber-950" />
                <span>Presiona {LOVE_SYMBOL}</span>
              </button>

              <button
                onClick={() => setIsPromptModalOpen(true)}
                className="px-5 py-3 bg-white hover:bg-amber-50 text-amber-900 border border-amber-200/80 rounded-2xl text-xs sm:text-sm font-medium transition-colors shadow-2xs flex items-center gap-1.5"
              >
                <FileText className="w-4 h-4 text-amber-600" />
                <span>Ver Prompt Maestro Detallado</span>
              </button>
            </div>

            {/* Micro proof info */}
            <div className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs text-stone-500">
              <span className="flex items-center gap-1 text-amber-800 font-medium">
                🌻 Girasoles & Lirios
              </span>
              <span>·</span>
              <span>Fotos & Notas Ilimitadas</span>
              <span>·</span>
              <span>100% Amor Infinito</span>
            </div>
          </div>

          {/* Hero Right Column: Featured Cover Photo with Bouquet */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group max-w-sm sm:max-w-md w-full">
              {/* Outer decorative ring */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-amber-300/40 via-yellow-200/40 to-amber-400/40 rounded-3xl blur-md -z-10 group-hover:blur-lg transition-all" />

              {/* Main Photo Card */}
              <div className="bg-white p-4 pb-8 rounded-3xl shadow-xl border border-amber-200/80 overflow-hidden transform group-hover:-translate-y-1 transition-all duration-300">
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-amber-100/50">
                  <img
                    src="/assets/aistudio/image_c8b21cb4.png"
                    alt="Mi niña hermosa con su ramo gigante de girasoles"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute bottom-3 left-3 right-3 bg-black/40 backdrop-blur-md rounded-xl p-2.5 text-white text-xs flex items-center justify-between">
                    <div>
                      <p className="font-serif font-semibold text-sm">Mi Girasol Favorito</p>
                      <p className="text-[10px] text-amber-200">La sonrisa que alegra mi existir</p>
                    </div>
                    <span className="font-mono text-xs font-bold text-amber-300">
                      {LOVE_SYMBOL}
                    </span>
                  </div>
                </div>

                <div className="mt-4 text-center">
                  <p className="font-serif text-lg font-bold text-amber-950">
                    "Tú eres mi sol en cualquier día nublado"
                  </p>
                  <p className="text-xs text-amber-800/80 italic mt-0.5">
                    Desde el 21 de septiembre de 2024 · Para siempre
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LIVE LOVE COUNTER SECTION */}
      <LoveCounter />

      {/* MAIN INTERACTIVE CONTENT AREA (Exact clean structure with category selector) */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Navigation Bar */}
        <div className="mb-10 flex items-center justify-center">
          <div className="flex gap-1.5 sm:gap-2 overflow-x-auto p-1.5 bg-amber-50/80 border border-amber-200/80 rounded-2xl max-w-full scrollbar-none">
            {/* Core Sections */}
            {[
              { key: 'galeria', label: 'Galería de Fotos', icon: Image },
              { key: 'recuerdos', label: 'Recuerdos Compartidos', icon: BookHeart },
              { key: 'favoritos', label: 'Cosas Favoritas', icon: Star },
              { key: 'mensajes', label: 'Cartas & Trofeo', icon: Mail },
              { key: 'secreto', label: 'Notas Secretas', icon: Lock },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => handleTabChange(tab.key as TabType)}
                  className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-amber-400 text-amber-950 shadow-xs font-semibold'
                      : 'text-stone-600 hover:text-amber-950 hover:bg-white/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 text-amber-700" />
                  <span>{tab.label}</span>
                </button>
              );
            })}

            {/* Separator */}
            <div className="w-px h-6 bg-amber-200/80 my-auto mx-1 shrink-0 hidden sm:block" />

            {/* Three distinct addition sections */}
            {[
              { key: 'add-fotos', label: '+ Fotos', icon: Camera },
              { key: 'add-notas', label: '+ Notas', icon: StickyNote },
              { key: 'add-cartas', label: '+ Cartas', icon: Mail },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => handleTabChange(tab.key as TabType)}
                  className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all border ${
                    isActive
                      ? 'bg-amber-300 text-amber-950 border-amber-400 shadow-2xs font-semibold'
                      : 'border-amber-200/60 bg-white/70 text-amber-900 hover:bg-amber-100/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 text-amber-700" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content Display */}
        <div className="relative">
          {activeTab === 'galeria' && (
            <PhotoGallery
              customPhotos={customPhotos}
              onNavigateToUpload={() => handleTabChange('add-fotos')}
            />
          )}
          {activeTab === 'recuerdos' && <SharedMemories />}
          {activeTab === 'favoritos' && <FavoriteThings />}
          {activeTab === 'mensajes' && <LoveMessages />}
          {activeTab === 'secreto' && <SecretVault />}

          {/* THREE NEW DEDICATED SECTIONS */}
          {activeTab === 'add-fotos' && (
            <PhotoUploaderSection
              customPhotos={customPhotos}
              onAddPhoto={handleAddCustomPhoto}
              onDeletePhoto={handleDeleteCustomPhoto}
            />
          )}

          {activeTab === 'add-notas' && <QuickNotesSection />}

          {activeTab === 'add-cartas' && <LoveLettersSection />}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="mt-auto border-t border-amber-200/80 bg-[#FFFDF7] py-10 px-4 sm:px-8 text-center text-xs text-stone-500">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="flex items-center justify-center gap-3">
            <SunflowerSilhouette size={24} className="text-amber-500" />
            <span className="font-serif font-bold text-amber-950 text-base tracking-widest">
              {LOVE_SYMBOL}
            </span>
            <LilySilhouette size={24} className="text-amber-500" />
          </div>

          <p className="text-stone-600 leading-relaxed font-serif text-sm">
            Creado con amor infinito para la mujer más hermosa y especial de mi vida.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-amber-900/80 text-[11px] pt-1">
            <span>Inicio: 21 de Septiembre 2024</span>
            <span>·</span>
            <button
              onClick={() => handleTabChange('add-fotos')}
              className="hover:text-amber-950 underline underline-offset-2"
            >
              + Fotos
            </button>
            <span>·</span>
            <button
              onClick={() => handleTabChange('add-notas')}
              className="hover:text-amber-950 underline underline-offset-2"
            >
              + Notas
            </button>
            <span>·</span>
            <button
              onClick={() => handleTabChange('add-cartas')}
              className="hover:text-amber-950 underline underline-offset-2"
            >
              + Cartas
            </button>
            <span>·</span>
            <button
              onClick={() => setIsPromptModalOpen(true)}
              className="hover:text-amber-950 underline underline-offset-2"
            >
              Ver Prompt Maestro
            </button>
          </div>
        </div>
      </footer>

      {/* Floating Action Button for the Symbol */}
      <button
        onClick={openSymbolModal}
        className="fixed bottom-6 right-6 z-40 p-3.5 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-500 hover:to-yellow-500 text-amber-950 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 border-2 border-amber-200 flex items-center gap-2"
        title="Símbolo de amor infinito"
      >
        <Heart className="w-4 h-4 fill-amber-950 text-amber-950 animate-pulse" />
        <span className="font-serif font-bold text-xs pr-1">{LOVE_SYMBOL}</span>
      </button>

      {/* Modals */}
      <SymbolSpecialModal
        isOpen={isSymbolModalOpen}
        onClose={() => setIsSymbolModalOpen(false)}
      />

      <PromptViewerModal
        isOpen={isPromptModalOpen}
        onClose={() => setIsPromptModalOpen(false)}
      />
    </div>
  );
}
