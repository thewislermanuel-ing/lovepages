// Soft Web Audio API romantic chime & harp arpeggio synthesizer
let audioCtx: AudioContext | null = null;
let isMuted = false;

export const setMuted = (muted: boolean) => {
  isMuted = muted;
};

export const getMuted = () => isMuted;

const getAudioContext = () => {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
};

/**
 * Plays a gentle, harmonic love chime arpeggio (C Major / E / G / B / C pentatonic)
 */
export const playLoveChime = () => {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const notes = [523.25, 659.25, 783.99, 987.77, 1046.50]; // C5, E5, G5, B5, C6
    const startTime = ctx.currentTime;

    notes.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime + index * 0.08);

      gain.gain.setValueAtTime(0.001, startTime + index * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.12, startTime + index * 0.08 + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + index * 0.08 + 0.9);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime + index * 0.08);
      osc.stop(startTime + index * 0.08 + 1.0);
    });
  } catch {
    // Ignore audio errors gracefully if browser blocks autoplay
  }
};

/**
 * Plays a soft warm heart-beat sound
 */
export const playHeartbeat = () => {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const t = ctx.currentTime;
    [0, 0.22].forEach((offset) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(110, t + offset);
      osc.frequency.exponentialRampToValueAtTime(55, t + offset + 0.12);

      gain.gain.setValueAtTime(0.2, t + offset);
      gain.gain.exponentialRampToValueAtTime(0.001, t + offset + 0.16);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t + offset);
      osc.stop(t + offset + 0.18);
    });
  } catch {
    // Graceful fallback
  }
};

/**
 * Plays an envelope opening sound
 */
export const playEnvelopeSound = () => {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const t = ctx.currentTime;
    const notes = [440, 554.37, 659.25];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t + idx * 0.06);

      gain.gain.setValueAtTime(0.01, t + idx * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.1, t + idx * 0.06 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + idx * 0.06 + 0.6);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t + idx * 0.06);
      osc.stop(t + idx * 0.06 + 0.7);
    });
  } catch {
    // Silent fail
  }
};
