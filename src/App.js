import { useState, useEffect, useCallback } from 'react';
import Board from './components/Board';
import Keyboard from './components/Keyboard';
import useLocalStorage from './hooks/useLocalStorage';
import useWords from './hooks/useWords.js';
import ResultPopup from './components/ResultPopup';
import './App.css';

const chance = 6;
let charCounts = {};

function App() {
  const {
      answerWord, 
      words, setWords, 
      status, setStatus, 
      keyStatus, setKeyStatus, 
      gameOver, setGameOver, 
      restartGame } = useWords();
  const [gameCount, setGameCount] = useLocalStorage('gameCount', { initialValue: 0, stateToStorage: (num) => num.toString(), storageToState: parseInt })
  const [scores, setScores] = useLocalStorage('scores', 
    { initialValue: Object.fromEntries([...Array(chance)].map((num, idx) => [idx + 1, 0])),
      stateToStorage: JSON.stringify, storageToState: JSON.parse });
  const [show, setShow] = useState(false);

  useEffect(() => {
    charCounts = Object.fromEntries([...Array(26)].map((num, idx) => [String.fromCharCode('A'.charCodeAt(0) + idx), 0]));

    for (let c of answerWord) {
      charCounts[c] = charCounts[c] ? charCounts[c] + 1 : 1;
    }
  }, [answerWord]);

  useEffect(() => {
    if (gameOver) setShow(true);
  }, [gameOver]);

  const handleType = useCallback((c) => {
    if (gameOver) return;
    setWords(prevWords => {
      if (prevWords.length === 0) return prevWords;
      if (prevWords[prevWords.length - 1].length === answerWord.length) return prevWords;
      return [...prevWords.slice(0, -1), prevWords[prevWords.length - 1] + c];
    })
  }, [answerWord, setWords, gameOver]);

  const handleErase = useCallback(() => {
    if (gameOver) return;
    setWords(prevWords => {
      if (prevWords.length === 0) return prevWords;
      if (prevWords[prevWords.length - 1].length === 0) return prevWords;
      return [...prevWords.slice(0, -1), prevWords[prevWords.length - 1].slice(0, -1)];
    });
  }, [setWords, gameOver]);

  const handleSubmit = useCallback(() => {
    if (gameOver) return;
    const word = words.slice(-1)[0];
    if (word.length !== answerWord.length) return;

    const curCharCounts = Object.fromEntries([...Array(26)].map((num, idx) => [String.fromCharCode('A'.charCodeAt(0) + idx), 0]));
    const curStatus = Array(word.length).fill(0);
    for (let i = 0; i < word.length; i++) {
      if (answerWord[i] === word[i]) {
        curStatus[i] = 3;
        curCharCounts[word[i]]++;
      }
    }

    for (let i = 0; i < word.length; i++) {
      if (curStatus[i]) continue;
      if (charCounts[word[i]] - curCharCounts[word[i]] > 0) {
        curCharCounts[word[i]]++;
        curStatus[i] = 2;
      } else {
        curStatus[i] = 1;
      }
    }

    
    const tries = status.length + 1;
    setStatus(status => [ ...status, curStatus ]);
    const newKeyStatus = {...keyStatus};
    [1, 3, 2].forEach(val => {
      for (let i = 0; i < word.length; i++) 
        if (curStatus[i] === val) newKeyStatus[word[i]] = val;
    });
    setKeyStatus(newKeyStatus);
    if (curStatus.every(val => val === 3)) {
      setGameOver(1);
      setGameCount(gameCount => gameCount + 1);
      setScores({ ...scores, [tries.toString()]: scores[tries.toString()] + 1 });
    } else if (words.length === chance) {
      setGameOver(2);
      setGameCount(gameCount => gameCount + 1);
    } else setWords(words => [...words, ""]);
  }, [gameOver, words, answerWord, setStatus, keyStatus, setKeyStatus, status, setWords, setGameOver, setGameCount, setScores, scores]);

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === 'Backspace') e.preventDefault();
      if (e.key === 'Enter') handleSubmit();
      else if (e.key === 'Backspace') handleErase();
      else if (e.key >= 'a' && e.key <= 'z') handleType(e.key.toUpperCase());
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleSubmit, handleErase, handleType]);
  

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: 'auto' }}>
      <h1>{!gameOver ? "Wordle" : gameOver === 1 ? "You Win!" : `You Lose!  answer : ${answerWord}`}</h1>
      <Board 
        len={answerWord.length}
        chance={chance}
        words={words} 
        status={status}/>
      <Keyboard 
        keyStatus={keyStatus}
        onType={handleType}
        onErase={handleErase}
        handleSubmit={handleSubmit}
        />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
        <button style={{ border: 'none', outline: 'none', backgroundColor: '#ECECEC', marginTop: '24px', 
                cursor: 'pointer', padding: '10px', borderRadius: '8px' }} onClick={restartGame}>New Game</button>
        <button style={{ border: 'none', outline: 'none', backgroundColor: '#ECECEC', marginTop: '24px', 
                cursor: 'pointer', padding: '10px', borderRadius: '8px' }} onClick={() => setShow(true)}>Score Board</button>
      </div>
      <ResultPopup 
        show={show} 
        setShow={setShow} 
        tries={status.length} 
        scores={scores} 
        gameCount={gameCount} 
        gameOver={gameOver} 
        answerWord={answerWord} />
    </div>
  );
}

export default App;
