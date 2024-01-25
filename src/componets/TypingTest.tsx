import TestDisplay from "./TestDisplay";
import text from "../1000-common.txt";
import { useEffect, useState, useRef } from "react";

enum TestState {
  NOT_STARTED,
  IN_PROGRESS,
  FINISHED
}

function formatTime(time: number) {
  const minutes = Math.floor(time / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  const miliseconds = Math.floor((time % 1000) / 10);
  const milisecondsWithLeadingZero = miliseconds < 10 ? `0${miliseconds}` : miliseconds;
  return `${minutes}:${seconds}:${milisecondsWithLeadingZero}`;
}

const TEST_SIZE = 10;

export default function TypingTest() {
  const [testState, setTestState] = useState<TestState>(TestState.NOT_STARTED);
  const [testWords, setTestWords] = useState<string[]>([]);
  const [pool, setPool] = useState<string[]>([]);
  const [userText, setUserText] = useState<string>("");
  const [startTime, setStartTime] = useState<number>(0);
  const [testTime, setTestTime] = useState<number>(0);
  const [wpm, setWpm] = useState<number>(0);
  const [testSize, setTestSize] = useState<number>(TEST_SIZE);

  function updateWpm() {
    setWpm(Math.floor((userText.length / 5) / (testTime / 60000)));
  }

  // test start effect, start test on first keypress
  useEffect(() => {
    if (testState === TestState.NOT_STARTED && userText.length > 0) {
      setTestState(TestState.IN_PROGRESS);
      setStartTime(Date.now());
    }
  }, [userText]);

  // set test time every milisecond
    useEffect(() => {
        if (testState === TestState.IN_PROGRESS) {
        const interval = setInterval(() => {
          setTestTime(Date.now() - startTime);
        }, 1);
        return () => clearInterval(interval);
        }
    }, [testState, startTime]);

  useEffect(() => {
    fetch(text)
      .then((response) => response.text()).then((text) => {
        const pool = text.split("\n");
        setPool(pool);
      });

  }, []);

  function getRandomWeightedIndex(weights: number[]) {
    const totalWeight = weights.reduce((acc, cur) => acc + cur, 0);
    const randomNum = Math.random() * totalWeight;
    let weightSum = 0;
    for (let i = 0; i < weights.length; i++){
      weightSum += weights[i];
      if (randomNum < weightSum) {
        return i;
      }
    }
    return 0;
  }

  function getWeightedRandomSample(array: string[], size: number) {
  const sample = [];
  const weights = array.map((_, index) => index < 100 ? index + 1 + 100000 : index + 1); // Assigning weights based on position

  for (let i = 0; i < size; i++) {
    const randomIndex = getRandomWeightedIndex(weights);
    sample.push(array[randomIndex]);
  }

  return sample;
}
  function oldgetWeightedRandomSample(array: string[], size: number) {
    const sample = [];
    const weights = array.map((word) => word.length);
    for (let i = 0; i < size; i++) {
      const randomIndex = getRandomWeightedIndex(weights);
      sample.push(array[randomIndex]);
    }
    return sample;
  }

  useEffect(() => {
    const testWords = pool.slice(0, 10);
    //        setTestWords(testWords);
    setTestWords(getWeightedRandomSample(pool, testSize));
  }, [pool]);

  // end test effect
    useEffect(() => {
        if (testState === TestState.IN_PROGRESS && userText === testWords.join(" ")) {
          setTestState(TestState.FINISHED);
        }
    }, [userText, testWords, testState]);

  // wpm effect
    useEffect(() => {
        if (testState === TestState.IN_PROGRESS) {
            updateWpm();
        }
    }, [userText, testTime, testState]);

  const inputRef = useRef<HTMLInputElement>(null);

  const newTest = () => {
    const testWords = getWeightedRandomSample(pool, testSize)
      .map(word => word?.toLowerCase());
    setTestWords(testWords);
    setUserText("");
    inputRef.current?.focus();
    setTestState(TestState.NOT_STARTED);
    setTestTime(0);
  }

  useEffect(() => {
    newTest()
  }, [])

  const handleOnBlur = () => {
    setTestState(TestState.FINISHED);
      updateWpm();
  }

  return (
      <div className="main">
          <h1>Typing Test</h1>
          <div className="stats">
        <span>Time: {formatTime(testTime)}</span>
        <span>usertext.length: {userText.length}</span>
        <span>WPM: {wpm}</span></div>
        <TestDisplay test={testWords.join(" ")} userText={userText} onClick={() => inputRef.current?.focus()} />
        <input id="user-input" ref={inputRef} type="text" value={userText} onChange={(e) => setUserText(e.target.value)}  onBlur={handleOnBlur} />
        <button onClick={newTest}>New Test</button>
    </div>
  )
}
