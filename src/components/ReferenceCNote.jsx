import { useState } from 'react';
import StaffDisplay from './StaffDisplay.jsx';

const trebleCNotes = [
  { note: { noteName: 'C', octave: 4, accidental: null }, label: 'C4 — Middle C', desc: 'Nằm trên dòng kẻ phụ đầu tiên phía dưới khuông nhạc. Phím C4 trên đàn.' },
  { note: { noteName: 'C', octave: 5, accidental: null }, label: 'C5', desc: 'Nằm ở khe thứ ba (giữa dòng 3 và dòng 4 từ dưới lên). Phím C5 trên đàn.' },
];

const bassCNotes = [
  { note: { noteName: 'C', octave: 3, accidental: null }, label: 'C3', desc: 'Nằm ở khe thứ hai từ dưới lên (giữa dòng 2 và dòng 3). Phím C3 trên đàn.' },
  { note: { noteName: 'C', octave: 4, accidental: null }, label: 'C4 — Middle C', desc: 'Nằm trên dòng kẻ phụ đầu tiên phía trên khuông nhạc. Phím C4 trên đàn.' },
];

function RefPanel({ notes, clef, title }) {
  return (
    <div className="reference-panel">
      <h4>{title}</h4>
      {notes.map(({ note, label, desc }) => (
        <div key={label} className="ref-note-item">
          <StaffDisplay note={note} clef={clef} mini />
          <div className="ref-note-info">
            <strong>{label}</strong>
            <p>{desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ReferenceCNote() {
  const [showTreble, setShowTreble] = useState(false);
  const [showBass, setShowBass] = useState(false);

  return (
    <div className="reference-section">
      <div className="reference-buttons">
        <button
          className={`ref-btn ${showTreble ? 'active' : ''}`}
          onClick={() => setShowTreble(v => !v)}
        >
          Nốt Đô khoá Son
        </button>
        <button
          className={`ref-btn ${showBass ? 'active' : ''}`}
          onClick={() => setShowBass(v => !v)}
        >
          Nốt Đô khoá Fa
        </button>
      </div>

      {showTreble && (
        <RefPanel
          notes={trebleCNotes}
          clef="treble"
          title="Nốt Đô — Khoá Son (Treble Clef)"
        />
      )}

      {showBass && (
        <RefPanel
          notes={bassCNotes}
          clef="bass"
          title="Nốt Đô — Khoá Fa (Bass Clef)"
        />
      )}
    </div>
  );
}
