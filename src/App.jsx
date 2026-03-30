import { useState, useCallback, useRef, useEffect } from 'react';
import StaffDisplay from './components/StaffDisplay.jsx';
import PianoKeyboard from './components/PianoKeyboard.jsx';
import StatsPanel from './components/StatsPanel.jsx';
import ReferenceCNote from './components/ReferenceCNote.jsx';
import RulesModal from './components/RulesModal.jsx';
import { generateRandomNote, checkAnswer, getExpectedKeyLabel, getNoteDisplayName, getExpectedDisplayName } from './utils/noteUtils.js';

function App() {
  const [clef, setClef] = useState('treble');
  const [currentNote, setCurrentNote] = useState(() => generateRandomNote('treble'));
  const [total, setTotal] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [times, setTimes] = useState([]);
  const [feedbackKey, setFeedbackKey] = useState(null);
  const [feedbackType, setFeedbackType] = useState(null);
  const [showCorrectKey, setShowCorrectKey] = useState(null);
  const [showRules, setShowRules] = useState(false);
  const [locked, setLocked] = useState(false);
  const noteStartTime = useRef(Date.now());
  const feedbackTimer = useRef(null);

  const nextNote = useCallback((newClef) => {
    const c = newClef || clef;
    setCurrentNote(generateRandomNote(c));
    noteStartTime.current = Date.now();
    setFeedbackKey(null);
    setFeedbackType(null);
    setShowCorrectKey(null);
    setLocked(false);
  }, [clef]);

  const handleKeyClick = useCallback((clickedNote, clickedOctave) => {
    if (locked) return;
    setLocked(true);

    const elapsed = Date.now() - noteStartTime.current;
    const isCorrect = checkAnswer(currentNote, clickedNote, clickedOctave);
    const clickedId = `${clickedNote}${clickedOctave}`;

    setTotal(t => t + 1);
    setTimes(ts => [...ts, elapsed]);
    setFeedbackKey(clickedId);

    if (isCorrect) {
      setCorrect(c => c + 1);
      setFeedbackType('correct');
    } else {
      setFeedbackType('incorrect');
      const expectedId = getExpectedKeyLabel(currentNote.noteName, currentNote.octave, currentNote.accidental);
      setShowCorrectKey(expectedId);
    }

    clearTimeout(feedbackTimer.current);
    feedbackTimer.current = setTimeout(() => {
      nextNote();
    }, isCorrect ? 600 : 1500);
  }, [currentNote, locked, nextNote]);

  const handleClefChange = useCallback((newClef) => {
    setClef(newClef);
    clearTimeout(feedbackTimer.current);
    nextNote(newClef);
  }, [nextNote]);

  const handleRestart = useCallback(() => {
    setTotal(0);
    setCorrect(0);
    setTimes([]);
    clearTimeout(feedbackTimer.current);
    nextNote();
  }, [nextNote]);

  useEffect(() => {
    return () => clearTimeout(feedbackTimer.current);
  }, []);

  const highlightKeys = showCorrectKey ? [showCorrectKey] : null;

  return (
    <div className="app">
      <header className="app-header">
        <h1>Đọc Nốt Nhạc Piano</h1>
        <div className="header-controls">
          <button className="btn btn-restart" onClick={handleRestart}>
            Chơi lại
          </button>
          <div className="clef-toggle">
            <button
              className={`btn btn-clef ${clef === 'treble' ? 'active' : ''}`}
              onClick={() => handleClefChange('treble')}
            >
              Khoá Son
            </button>
            <button
              className={`btn btn-clef ${clef === 'bass' ? 'active' : ''}`}
              onClick={() => handleClefChange('bass')}
            >
              Khoá Fa
            </button>
          </div>
        </div>
      </header>

      <StatsPanel total={total} correct={correct} times={times} />

      <div className="staff-area">
        <StaffDisplay note={currentNote} clef={clef} />
        {feedbackType === 'correct' && (
          <div className="feedback-text correct-text">Đúng!</div>
        )}
        {feedbackType === 'incorrect' && (
          <div className="feedback-text incorrect-text">
            Sai! Nốt {getNoteDisplayName(currentNote.noteName, currentNote.octave, currentNote.accidental)} → Phím {getExpectedDisplayName(currentNote.noteName, currentNote.octave, currentNote.accidental)}
          </div>
        )}
      </div>

      <ReferenceCNote />

      <div className="rules-button-container">
        <button className="btn btn-rules" onClick={() => setShowRules(true)}>
          Luật đọc nốt nhạc cơ bản
        </button>
      </div>

      <PianoKeyboard
        onKeyClick={handleKeyClick}
        feedbackKey={feedbackKey}
        feedbackType={feedbackType}
        highlightKeys={highlightKeys}
      />

      <RulesModal isOpen={showRules} onClose={() => setShowRules(false)} />
    </div>
  );
}

export default App;
