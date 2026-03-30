let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playNote(noteName, octave) {
  const ctx = getAudioContext();
  const midi = noteToMidiNum(noteName, octave);
  const freq = 440 * Math.pow(2, (midi - 69) / 12);
  const now = ctx.currentTime;

  const masterGain = ctx.createGain();
  masterGain.gain.setValueAtTime(0.35, now);
  masterGain.gain.exponentialRampToValueAtTime(0.25, now + 0.05);
  masterGain.gain.exponentialRampToValueAtTime(0.001, now + 1.8);
  masterGain.connect(ctx.destination);

  // Fundamental
  createOsc(ctx, freq, 'triangle', 1.0, now, masterGain);
  // 2nd harmonic (octave)
  createOsc(ctx, freq * 2, 'sine', 0.3, now, masterGain);
  // 3rd harmonic
  createOsc(ctx, freq * 3, 'sine', 0.1, now, masterGain);
}

function createOsc(ctx, freq, type, volume, startTime, destination) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(freq, startTime);

  gain.gain.setValueAtTime(volume, startTime);
  gain.gain.exponentialRampToValueAtTime(0.001, startTime + 1.8);

  osc.connect(gain);
  gain.connect(destination);

  osc.start(startTime);
  osc.stop(startTime + 2);
}

const CHROMATIC = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

function noteToMidiNum(noteName, octave) {
  const index = CHROMATIC.indexOf(noteName);
  return (octave + 1) * 12 + index;
}
