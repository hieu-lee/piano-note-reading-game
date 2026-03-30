import { ALL_PIANO_KEYS } from '../utils/constants.js';
import { playNote } from '../utils/sound.js';
import './PianoKeyboard.css';

const BLACK_KEY_OFFSETS = {
  'C#': 0.6,
  'D#': 1.75,
  'F#': 3.55,
  'G#': 4.65,
  'A#': 5.8,
};

export default function PianoKeyboard({ onKeyClick, feedbackKey, feedbackType, highlightKeys }) {
  const whiteKeys = ALL_PIANO_KEYS.filter(k => k.type === 'white');
  const whiteKeyWidth = 100 / whiteKeys.length;

  let whiteIndex = 0;
  const octaveWhiteStarts = {};
  for (const key of ALL_PIANO_KEYS) {
    if (key.type === 'white') {
      const id = `${key.note}${key.octave}`;
      if (key.note === 'C') {
        octaveWhiteStarts[key.octave] = whiteIndex;
      }
      whiteIndex++;
    }
  }

  return (
    <div className="piano-container">
      <div className="piano-keyboard">
        {ALL_PIANO_KEYS.map((key) => {
          const id = `${key.note}${key.octave}`;
          const isFeedback = feedbackKey === id;
          const isHighlight = highlightKeys && highlightKeys.includes(id);

          if (key.type === 'white') {
            const wIdx = whiteKeys.findIndex(
              w => w.note === key.note && w.octave === key.octave
            );

            return (
              <div
                key={id}
                className={
                  'piano-key white-key'
                  + (isFeedback ? ` feedback-${feedbackType}` : '')
                  + (isHighlight ? ' highlight' : '')
                }
                style={{ left: `${wIdx * whiteKeyWidth}%`, width: `${whiteKeyWidth}%` }}
                onClick={() => { playNote(key.note, key.octave); onKeyClick(key.note, key.octave); }}
              >
                {key.note === 'C' && (
                  <span className="key-label">C{key.octave}</span>
                )}
              </div>
            );
          } else {
            const octaveStart = octaveWhiteStarts[key.octave];
            const offset = BLACK_KEY_OFFSETS[key.note];
            if (offset === undefined || octaveStart === undefined) return null;
            const leftPercent = (octaveStart + offset) * whiteKeyWidth;

            return (
              <div
                key={id}
                className={
                  'piano-key black-key'
                  + (isFeedback ? ` feedback-${feedbackType}` : '')
                  + (isHighlight ? ' highlight' : '')
                }
                style={{ left: `${leftPercent}%`, width: `${whiteKeyWidth * 0.65}%` }}
                onClick={() => { playNote(key.note, key.octave); onKeyClick(key.note, key.octave); }}
              />
            );
          }
        })}
      </div>
    </div>
  );
}
