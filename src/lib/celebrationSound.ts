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
