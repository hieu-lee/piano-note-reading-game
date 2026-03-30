import { TREBLE_NOTES, BASS_NOTES, CHROMATIC_SCALE } from './constants.js';

export function generateRandomNote(clefType) {
  const notes = clefType === 'treble' ? TREBLE_NOTES : BASS_NOTES;
  const baseNote = notes[Math.floor(Math.random() * notes.length)];

  // ~30% chance of accidental
  const accidentalRoll = Math.random();
  let accidental = null;
  if (accidentalRoll < 0.15) {
    accidental = 'sharp';
  } else if (accidentalRoll < 0.30) {
    accidental = 'flat';
  }

  return {
    noteName: baseNote.note,
    octave: baseNote.octave,
    accidental,
  };
}

export function noteToMidi(noteName, octave) {
  const index = CHROMATIC_SCALE.indexOf(noteName);
  if (index === -1) return -1;
  return (octave + 1) * 12 + index;
}

export function midiToNote(midi) {
  const octave = Math.floor(midi / 12) - 1;
  const index = midi % 12;
  return { noteName: CHROMATIC_SCALE[index], octave };
}

export function getExpectedMidi(noteName, octave, accidental) {
  const baseMidi = noteToMidi(noteName, octave);
  if (accidental === 'sharp') return baseMidi + 1;
  if (accidental === 'flat') return baseMidi - 1;
  return baseMidi;
}

export function checkAnswer(expected, clickedNote, clickedOctave) {
  const expectedMidi = getExpectedMidi(expected.noteName, expected.octave, expected.accidental);
  const clickedMidi = noteToMidi(clickedNote, clickedOctave);
  return expectedMidi === clickedMidi;
}

export function getExpectedKeyLabel(noteName, octave, accidental) {
  const midi = getExpectedMidi(noteName, octave, accidental);
  const { noteName: n, octave: o } = midiToNote(midi);
  return `${n}${o}`;
}

const VN_NOTE_NAMES = {
  C: 'Đô', D: 'Rê', E: 'Mi', F: 'Fa', G: 'Sol', A: 'La', B: 'Si',
};

export function getNoteDisplayName(noteName, octave, accidental) {
  const vn = VN_NOTE_NAMES[noteName] || noteName;
  const acc = accidental === 'sharp' ? ' thăng' : accidental === 'flat' ? ' giáng' : '';
  return `${vn}${acc} (${noteName}${accidental === 'sharp' ? '♯' : accidental === 'flat' ? '♭' : ''}${octave})`;
}

export function getExpectedDisplayName(noteName, octave, accidental) {
  const midi = getExpectedMidi(noteName, octave, accidental);
  const { noteName: n, octave: o } = midiToNote(midi);
  const vn = VN_NOTE_NAMES[n.charAt(0)] || n;
  const isBlack = n.includes('#');
  const label = isBlack ? `${n}${o}` : `${vn} (${n}${o})`;
  return label;
}
