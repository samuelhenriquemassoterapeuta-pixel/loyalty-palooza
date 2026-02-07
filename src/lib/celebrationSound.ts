/**
 * Plays a celebratory chime sound using the Web Audio API.
 * No external files needed — generates a pleasant ascending arpeggio.
 */
export const playCelebrationSound = () => {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();

    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    const noteDuration = 0.12;
    const startTime = ctx.currentTime;

    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, startTime + i * noteDuration);

      gain.gain.setValueAtTime(0, startTime + i * noteDuration);
      gain.gain.linearRampToValueAtTime(0.15, startTime + i * noteDuration + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + i * noteDuration + noteDuration + 0.15);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime + i * noteDuration);
      osc.stop(startTime + i * noteDuration + noteDuration + 0.2);
    });

    // Sparkle overlay
    const sparkle = ctx.createOscillator();
    const sparkleGain = ctx.createGain();
    sparkle.type = "triangle";
    sparkle.frequency.setValueAtTime(1568, startTime + 0.35); // G6
    sparkleGain.gain.setValueAtTime(0, startTime + 0.35);
    sparkleGain.gain.linearRampToValueAtTime(0.08, startTime + 0.37);
    sparkleGain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.7);
    sparkle.connect(sparkleGain);
    sparkleGain.connect(ctx.destination);
    sparkle.start(startTime + 0.35);
    sparkle.stop(startTime + 0.75);

    // Clean up context after sounds finish
    setTimeout(() => ctx.close(), 1500);
  } catch {
    // Silently fail — sound is non-critical
  }
};

/**
 * Plays a grander, more epic fanfare for level-up events.
 * Uses a richer harmonic structure with a triumphant ascending chord progression.
 */
export const playLevelUpSound = () => {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const startTime = ctx.currentTime;

    // Fanfare chord: C major → G major → C octave (triumphant)
    const chords = [
      { notes: [261.63, 329.63, 392.0], time: 0 },       // C4 chord
      { notes: [392.0, 493.88, 587.33], time: 0.25 },     // G4 chord  
      { notes: [523.25, 659.25, 783.99], time: 0.5 },     // C5 chord
      { notes: [1046.5], time: 0.75 },                     // C6 apex
    ];

    chords.forEach(({ notes, time }) => {
      notes.forEach((freq) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, startTime + time);

        gain.gain.setValueAtTime(0, startTime + time);
        gain.gain.linearRampToValueAtTime(0.12, startTime + time + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + time + 0.4);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime + time);
        osc.stop(startTime + time + 0.45);
      });
    });

    // Shimmer tail — two high sparkles
    [1568, 2093].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      const t = startTime + 0.85 + i * 0.1;
      osc.frequency.setValueAtTime(freq, t);
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.06, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.35);
    });

    setTimeout(() => ctx.close(), 2000);
  } catch {
    // Silently fail — sound is non-critical
  }
};
