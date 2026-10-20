import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music, Pause } from 'lucide-react';
import { setMuted, getMuted } from '../utils/audio';

export const RomanticAudioPlayer: React.FC = () => {
  const [muted, setMutedState] = useState(false);
  const [isPlayingMelody, setIsPlayingMelody] = useState(false);
  const melodyTimerRef = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    setMutedState(getMuted());
  }, []);

  const toggleMute = () => {
    const next = !muted;
    setMutedState(next);
    setMuted(next);
    if (next && isPlayingMelody) {
      stopMelody();
    }
  };

  const getAudioContext = () => {
    if (!audioContextRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        audioContextRef.current = new AudioCtx();
      }
    }
    if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume().catch(() => {});
    }
    return audioContextRef.current;
  };

  const playChord = (frequencies: number[], duration = 3.5) => {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    frequencies.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.05);

      gain.gain.setValueAtTime(0.0001, now + idx * 0.05);
      gain.gain.linearRampToValueAtTime(0.035, now + idx * 0.05 + 0.5);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.05 + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.05);
      osc.stop(now + idx * 0.05 + duration + 0.1);
    });
  };

  const startMelody = () => {
    if (muted) {
      setMuted(false);
      setMutedState(false);
    }
    setIsPlayingMelody(true);

    // Warm romantic progression: Cmaj9 -> Am9 -> Fmaj7 -> Gsus4
    const progression = [
      [261.63, 329.63, 392.00, 493.88, 587.33], // C, E, G, B, D
      [220.00, 261.63, 329.63, 392.00, 493.88], // A, C, E, G, B
      [174.61, 261.63, 329.63, 349.23, 440.00], // F, C, E, F, A
      [196.00, 261.63, 293.66, 392.00, 493.88], // G, C, D, G, B
    ];

    let chordIdx = 0;
    playChord(progression[0]);

    melodyTimerRef.current = window.setInterval(() => {
      chordIdx = (chordIdx + 1) % progression.length;
      playChord(progression[chordIdx]);
    }, 3800);
  };

  const stopMelody = () => {
    if (melodyTimerRef.current) {
      clearInterval(melodyTimerRef.current);
      melodyTimerRef.current = null;
    }
    setIsPlayingMelody(false);
  };

  const toggleMelody = () => {
    if (isPlayingMelody) {
      stopMelody();
    } else {
      startMelody();
    }
  };

  return (
    <div className="flex items-center gap-1.5 bg-amber-100/70 border border-amber-200/80 rounded-full px-2.5 py-1 text-xs text-amber-900 shadow-2xs">
      {/* Background soft melody button */}
      <button
        onClick={toggleMelody}
        className={`flex items-center gap-1 px-2 py-0.5 rounded-full transition-colors ${
          isPlayingMelody
            ? 'bg-amber-300 text-amber-950 font-medium'
            : 'hover:bg-amber-200/60 text-amber-800'
        }`}
        title={isPlayingMelody ? 'Pausar melodía suave' : 'Reproducir melodía suave de fondo'}
      >
        {isPlayingMelody ? (
          <>
            <Pause className="w-3.5 h-3.5 animate-pulse" />
            <span className="hidden sm:inline">Música On</span>
          </>
        ) : (
          <>
            <Music className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Música</span>
          </>
        )}
      </button>

      {/* Mute SFX toggle */}
      <button
        onClick={toggleMute}
        className="p-1 text-amber-800 hover:text-amber-950 transition-colors rounded-full"
        title={muted ? 'Activar efectos sonoros' : 'Silenciar efectos'}
      >
        {muted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
      </button>
    </div>
  );
};
