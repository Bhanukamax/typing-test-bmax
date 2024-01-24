import TestDisplay from "./TestDisplay";
import text from "../1000-common.txt";
import { useEffect, useState, useRef } from "react";

export default function TypingTest() {
  const [testWords, setTestWords] = useState<string[]>([]);
  const [pool, setPool] = useState<string[]>([]);
    const [userText, setUserText] = useState<string>("");

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
    for (let i = 0; i < weights.length; i++) {
      weightSum += weights[i];
      if (randomNum < weightSum) {
        return i;
      }
    }
    return 0;
  }

  function getWeightedRandomSample(array: string[], size: number) {
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
        setTestWords(getWeightedRandomSample(pool, 10));
    }, [pool]);

  const inputRef = useRef<HTMLInputElement>(null);

  const newTest = () => {
    const testWords = pool.slice(0, 10);
    setTestWords(getWeightedRandomSample(pool, 10));
    setUserText("");
    inputRef.current?.focus();
  }

  useEffect(() => {
    newTest()
  }, [])

    return (
        <div>
            <h1>Typing Test</h1>
            <input id="user-input" ref={inputRef} type="text" value={userText} onChange={(e) => setUserText(e.target.value)} />
            <button onClick={newTest}>New Test</button>
            <TestDisplay test={testWords.join(" ")} userText={userText} onClick={() => inputRef.current?.focus() } />
        </div>
    )
}
