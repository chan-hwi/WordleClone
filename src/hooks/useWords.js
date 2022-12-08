import useLocalStorage from './useLocalStorage';
import randomWords from 'random-words';
import cryptoJS from 'crypto-js';

const key = '0123456789abcdef';
const encrypt = curWord => cryptoJS.AES.encrypt(curWord, key).toString();
const decrypt = encrypted => cryptoJS.AES.decrypt(encrypted, key).toString(cryptoJS.enc.Utf8);

function useWords() {
    const [answerWord, setAnswerWord] = useLocalStorage('answerWord', { initialValue: randomWords().toUpperCase(), stateToStorage: encrypt, storageToState: decrypt });
    const [words, setWords] = useLocalStorage('words', { initialValue: [""], stateToStorage: JSON.stringify, storageToState: JSON.parse });
    const [status, setStatus] = useLocalStorage('status', { initialValue: [], stateToStorage: JSON.stringify, storageToState: JSON.parse });
    const [keyStatus, setKeyStatus] = useLocalStorage('keyStatus', { initialValue: {}, stateToStorage: JSON.stringify, storageToState: JSON.parse });
    const [gameOver, setGameOver] = useLocalStorage('gameOver', { initialValue: 0, stateToStorage: (num) => num.toString(), storageToState: parseInt });
    
    const restartGame = () => {
        setAnswerWord(randomWords().toUpperCase());
        setWords([""]);
        setStatus([]);
        setKeyStatus({});
        setGameOver(0);
    }

    return { answerWord, words, setWords, status, setStatus, keyStatus, setKeyStatus, gameOver, setGameOver, restartGame };
}

export default useWords;