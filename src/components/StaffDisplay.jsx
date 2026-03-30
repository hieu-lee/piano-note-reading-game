import { getStaffPosition, SHARP_SYMBOL, FLAT_SYMBOL } from '../utils/constants.js';

const LINE_SPACING = 16;
const STAFF_LINES = 5;
const STAFF_HEIGHT = LINE_SPACING * (STAFF_LINES - 1);
const NOTE_RX = 9;
const NOTE_RY = 6.5;
const STEM_LENGTH = 42;

function getLayoutForMode(mini) {
  const staffTop = mini ? 45 : 65;
  return {
    width: mini ? 200 : 340,
    height: mini ? 140 : 200,
    staffLeft: mini ? 50 : 80,
    staffRight: mini ? 180 : 300,
    noteX: mini ? 130 : 210,
    staffTop,
    staffBottom: staffTop + STAFF_HEIGHT,
  };
}

function getYForPosition(position, staffTop) {
  return staffTop + STAFF_HEIGHT - (position * LINE_SPACING / 2);
}

const MUSIC_FONT = "'Noto Music', 'Musica', 'FreeSerif', 'Symbola', serif";

function TrebleClef({ x, staffTop }) {
  // The treble clef curl sits on the G line (2nd from bottom = staffTop + 3*LINE_SPACING).
  // The glyph baseline aligns roughly with the curl center.
  const gLine = staffTop + 2 * LINE_SPACING;
  return (
    <text
      x={x}
      y={gLine}
      fontSize="56"
      fontFamily={MUSIC_FONT}
      fill="currentColor"
      dominantBaseline="central"
      style={{ transform: `translate(0px, ${LINE_SPACING * 0.15}px)` }}
    >
      {'\uD834\uDD1E'}
    </text>
  );
}

function BassClef({ x, staffTop }) {
  // The bass clef colon sits around the F line (2nd from top = staffTop + LINE_SPACING).
  const fLine = staffTop + LINE_SPACING;
  return (
    <text
      x={x}
      y={fLine}
      fontSize="60"
      fontFamily={MUSIC_FONT}
      fill="currentColor"
      dominantBaseline="central"
      style={{ transform: `translate(0px, ${LINE_SPACING * 0.6}px)` }}
    >
      {'\uD834\uDD22'}
    </text>
  );
}

function LedgerLines({ y, staffTop, staffBottom, noteX }) {
  const lines = [];
  const ledgerWidth = 36;

  if (y > staffBottom + 2) {
    for (let ly = staffBottom + LINE_SPACING; ly <= y + 2; ly += LINE_SPACING) {
      lines.push(
        <line
          key={`below-${ly}`}
          x1={noteX - ledgerWidth / 2}
          y1={ly}
          x2={noteX + ledgerWidth / 2}
          y2={ly}
          stroke="currentColor"
          strokeWidth="1.5"
        />
      );
    }
  }

  if (y < staffTop - 2) {
    for (let ly = staffTop - LINE_SPACING; ly >= y - 2; ly -= LINE_SPACING) {
      lines.push(
        <line
          key={`above-${ly}`}
          x1={noteX - ledgerWidth / 2}
          y1={ly}
          x2={noteX + ledgerWidth / 2}
          y2={ly}
          stroke="currentColor"
          strokeWidth="1.5"
        />
      );
    }
  }

  return <>{lines}</>;
}

export default function StaffDisplay({ note, clef, mini = false }) {
  if (!note) return null;

  const layout = getLayoutForMode(mini);
  const { width, height, staffLeft, staffRight, noteX, staffTop, staffBottom } = layout;

  const position = getStaffPosition(note.noteName, note.octave, clef);
  const noteY = getYForPosition(position, staffTop);

  const middlePosition = 4;
  const stemUp = position < middlePosition;

  const stemX = stemUp ? noteX + NOTE_RX - 1.5 : noteX - NOTE_RX + 1.5;
  const stemY1 = noteY;
  const stemY2 = stemUp ? noteY - STEM_LENGTH : noteY + STEM_LENGTH;

  const staffLines = [];
  for (let i = 0; i < STAFF_LINES; i++) {
    staffLines.push(
      <line
        key={`staff-${i}`}
        x1={staffLeft}
        y1={staffTop + i * LINE_SPACING}
        x2={staffRight}
        y2={staffTop + i * LINE_SPACING}
        stroke="currentColor"
        strokeWidth="1.5"
      />
    );
  }

  const accidentalSymbol = note.accidental === 'sharp' ? SHARP_SYMBOL
    : note.accidental === 'flat' ? FLAT_SYMBOL
    : null;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width="100%"
      style={{ maxWidth: mini ? 220 : 420, display: 'block', margin: '0 auto' }}
      className="staff-display"
    >
      {staffLines}

      {clef === 'treble'
        ? <TrebleClef x={staffLeft - 2} staffTop={staffTop} />
        : <BassClef x={staffLeft + 2} staffTop={staffTop} />
      }

      <LedgerLines
        y={noteY}
        staffTop={staffTop}
        staffBottom={staffBottom}
        noteX={noteX}
      />

      <ellipse
        cx={noteX}
        cy={noteY}
        rx={NOTE_RX}
        ry={NOTE_RY}
        fill="currentColor"
        transform={`rotate(-15, ${noteX}, ${noteY})`}
      />

      <line
        x1={stemX}
        y1={stemY1}
        x2={stemX}
        y2={stemY2}
        stroke="currentColor"
        strokeWidth="2"
      />

      {accidentalSymbol && (
        <text
          x={noteX - NOTE_RX - 18}
          y={noteY + 7}
          fontSize="22"
          fontFamily="serif"
          fill="currentColor"
          fontWeight="bold"
        >
          {accidentalSymbol}
        </text>
      )}
    </svg>
  );
}
