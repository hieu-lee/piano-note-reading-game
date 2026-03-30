export const NOTE_NAMES = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

export const ALL_PIANO_KEYS = [];

for (let octave = 2; octave <= 5; octave++) {
  ALL_PIANO_KEYS.push(
    { note: 'C', octave, type: 'white' },
    { note: 'C#', octave, type: 'black' },
    { note: 'D', octave, type: 'white' },
    { note: 'D#', octave, type: 'black' },
    { note: 'E', octave, type: 'white' },
    { note: 'F', octave, type: 'white' },
    { note: 'F#', octave, type: 'black' },
    { note: 'G', octave, type: 'white' },
    { note: 'G#', octave, type: 'black' },
    { note: 'A', octave, type: 'white' },
    { note: 'A#', octave, type: 'black' },
    { note: 'B', octave, type: 'white' },
  );
}
ALL_PIANO_KEYS.push({ note: 'C', octave: 6, type: 'white' });

export const CHROMATIC_SCALE = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export const TREBLE_NOTES = [
  { note: 'B', octave: 3 },
  { note: 'C', octave: 4 },
  { note: 'D', octave: 4 },
  { note: 'E', octave: 4 },
  { note: 'F', octave: 4 },
  { note: 'G', octave: 4 },
  { note: 'A', octave: 4 },
  { note: 'B', octave: 4 },
  { note: 'C', octave: 5 },
  { note: 'D', octave: 5 },
  { note: 'E', octave: 5 },
  { note: 'F', octave: 5 },
];

export const BASS_NOTES = [
  { note: 'G', octave: 2 },
  { note: 'A', octave: 2 },
  { note: 'B', octave: 2 },
  { note: 'C', octave: 3 },
  { note: 'D', octave: 3 },
  { note: 'E', octave: 3 },
  { note: 'F', octave: 3 },
  { note: 'G', octave: 3 },
  { note: 'A', octave: 3 },
  { note: 'B', octave: 3 },
  { note: 'C', octave: 4 },
  { note: 'D', octave: 4 },
];

// Staff line positions (Y offsets from top of staff)
// Each half-step on the staff = 10px
// Treble clef: top line = F5, bottom line = E4
// Lines: F5, D5, B4, G4, E4
// Bass clef: top line = A3, bottom line = G2
// Lines: A3, F3, D3, B2, G2

const TREBLE_NOTE_ORDER = [
  { note: 'E', octave: 4, position: 0 },
  { note: 'F', octave: 4, position: 1 },
  { note: 'G', octave: 4, position: 2 },
  { note: 'A', octave: 4, position: 3 },
  { note: 'B', octave: 4, position: 4 },
  { note: 'C', octave: 5, position: 5 },
  { note: 'D', octave: 5, position: 6 },
  { note: 'E', octave: 5, position: 7 },
  { note: 'F', octave: 5, position: 8 },
];

const BASS_NOTE_ORDER = [
  { note: 'G', octave: 2, position: 0 },
  { note: 'A', octave: 2, position: 1 },
  { note: 'B', octave: 2, position: 2 },
  { note: 'C', octave: 3, position: 3 },
  { note: 'D', octave: 3, position: 4 },
  { note: 'E', octave: 3, position: 5 },
  { note: 'F', octave: 3, position: 6 },
  { note: 'G', octave: 3, position: 7 },
  { note: 'A', octave: 3, position: 8 },
];

export function getStaffPosition(note, octave, clef) {
  const order = clef === 'treble' ? TREBLE_NOTE_ORDER : BASS_NOTE_ORDER;
  const found = order.find(n => n.note === note && n.octave === octave);
  if (found) return found.position;

  // Handle notes outside the 5-line range (ledger lines)
  const noteIndex = NOTE_NAMES.indexOf(note);

  if (clef === 'treble') {
    const baseNote = NOTE_NAMES.indexOf('E');
    const baseOctave = 4;
    const octaveDiff = octave - baseOctave;
    const noteDiff = noteIndex - baseNote;
    return octaveDiff * 7 + noteDiff;
  } else {
    const baseNote = NOTE_NAMES.indexOf('G');
    const baseOctave = 2;
    const octaveDiff = octave - baseOctave;
    const noteDiff = noteIndex - baseNote;
    return octaveDiff * 7 + noteDiff;
  }
}

export const SHARP_SYMBOL = '♯';
export const FLAT_SYMBOL = '♭';
