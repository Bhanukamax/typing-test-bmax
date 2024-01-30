import TestDisplay from './test-display';
import text from '../1000-common.txt';
import { IoReloadCircle } from 'react-icons/io5';
import { useEffect, useState, useRef } from 'react';
import { setTheme, Themes } from '../util/theme';
import { useFocusRefOnBodyClick } from '../hooks';
import { useSettings } from '../util/settings';

enum TestState {
    NOT_STARTED,
    IN_PROGRESS,
    FINISHED,
}

function stateToString(state: TestState) {
    switch (state) {
        case TestState.FINISHED:
            return 'FINISHED';
        case TestState.IN_PROGRESS:
            return 'IN PROGRESS';
        case TestState.NOT_STARTED:
            return 'NOT STARTED';
        default:
            return 'UNKWON';
    }
}

function formatTime(time: number) {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const miliseconds = Math.floor((time % 1000) / 10);
    const milisecondsWithLeadingZero =
        miliseconds < 10 ? `0${miliseconds}` : miliseconds;
    return `${minutes}:${seconds}:${milisecondsWithLeadingZero}`;
}

setTheme(Themes.MONKEY);

type Props = {
    wordCount: number;
};

export default function TypingTest({ wordCount }: Props) {
    const { settings } = useSettings();
    const [testState, setTestState] = useState<TestState>(
        TestState.NOT_STARTED
    );
    const [testWords, setTestWords] = useState<string[]>([]);
    const [pool, setPool] = useState<string[]>([]);
    const [userText, setUserText] = useState<string>('');
    const [startTime, setStartTime] = useState<number>(0);
    const [testTime, setTestTime] = useState<number>(0);
    const [wpm, setWpm] = useState<number>(0);
    const [testSize, setTestSize] = useState<number>(wordCount);
    const [practiceQue, setPracticeQue] = useState<string[]>([]);
    const [matchedUserText, setMatchedUserText] = useState<string>('');
    const [currentWordIndex, setCurrentWordIndex] = useState<number>(0); // New state variable

    function updateWpm() {
        const newUserText = matchedUserText + ' ' + userText;
        const wrongLetterCount = userText
            .split('')
            .reduce((acc, cur, index) => {
                if (cur !== testWords.join(' ')[index]) {
                    return acc + 1;
                }
                return acc;
            }, 0);

        setWpm(
            Math.floor(
                (newUserText.length - wrongLetterCount) / 5 / (testTime / 60000)
            )
        );
    }

    useEffect(() => {
        if (testState === TestState.IN_PROGRESS) {
            if (userText === testWords[currentWordIndex] + ' ') {
                setUserText('');
                setCurrentWordIndex(currentWordIndex + 1);
                setMatchedUserText(
                    (matchedUserText ? matchedUserText + ' ' : '') +
                        testWords[currentWordIndex]
                );
            }
        }
    }, [userText]);

    // test start effect, start test on first keypress
    useEffect(() => {
        if (testState === TestState.NOT_STARTED && userText.length > 0) {
            setTestState(TestState.IN_PROGRESS);
            setStartTime(Date.now());
        }
    }, [userText]);

    // set test time every milisecond
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (testState === TestState.IN_PROGRESS) {
            interval = setInterval(() => {
                setTestTime(Date.now() - startTime);
            }, 1);
        }
        return () => clearInterval(interval);
    }, [testState, startTime]);

    useEffect(() => {
        fetch(text)
            .then((response) => response.text())
            .then((text) => {
                const pool = text.split('\n');
                setPool(pool);
            });
    }, [text]);

    useEffect(() => {
        newTest();
    }, [pool]);

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
        const weights = array.map((_, index) =>
            index < 100 ? index + 1 + 100000 : index + 1
        ); // Assigning weights based on position

        for (let i = 0; i < size; i++) {
            const randomIndex = getRandomWeightedIndex(weights);
            sample.push(array[randomIndex]);
        }

        return sample;
    }

    function addPracticeWordsToTest(
        testWords: string[],
        practiceQue: string[],
        take: number
    ): string[] {
        const practiceWords = practiceQue.slice(0, take);
        const reducedTestWords = testWords.slice(practiceWords.length);
        const newTestWords = [...practiceWords, ...reducedTestWords];
        const shuffledWords = newTestWords.sort(() => Math.random() - 0.5);
        return shuffledWords;
    }

    // end test effect
    useEffect(() => {
        const newUserText = matchedUserText + ' ' + userText;
        if (
            (testState === TestState.IN_PROGRESS &&
                newUserText === testWords.join(' ')) ||
            newUserText.length >= testWords.join(' ').length
        ) {
            setTestState(TestState.FINISHED);
            //          setMatchedUserText("");
        }
    }, [userText, testWords, testState, matchedUserText]);

    // wpm effect
    useEffect(() => {
        if (testState === TestState.IN_PROGRESS) {
            updateWpm();
        }
    }, [userText, testTime, testState]);

    const testTextInputRef = useRef<HTMLInputElement>(null);

    useFocusRefOnBodyClick(testTextInputRef);

    const newTest = () => {
        const testWords = getWeightedRandomSample(pool, testSize).map((word) =>
            word?.toLowerCase()
        );
        const practiceWords = addPracticeWordsToTest(testWords, practiceQue, 4);
        setTestWords(practiceWords);

        setUserText('');
        testTextInputRef.current?.focus();
        setTestState(TestState.NOT_STARTED);
        setTestTime(0);
        setMatchedUserText('');
        setCurrentWordIndex(0);
    };

    useEffect(() => {
        newTest();
    }, []);

    const handleOnBlur = () => {
        return;
        setTestState(TestState.FINISHED);
        updateWpm();
    };

    const handleOnFocus = () => {
        testTextInputRef.current?.setSelectionRange(-1, -1);
    };

    const defaultInputClasses = 'top-0 right-0 opacity-0 fixed size-0';
    const visibleInputClasses = 'border-0 rounded-full color-sub mb-4';

    return (
        <>
            <div className="stats color-main text-xl">
                <span>WPM: {wpm}</span>
                <span>Time: {formatTime(testTime)}</span>
            </div>
            <TestDisplay
                test={testWords.join(' ')}
                userText={
                    (matchedUserText ? matchedUserText + ' ' : '') + userText
                }
                onClick={() => testTextInputRef.current?.focus()}
            />
            <input
                id="user-input"
                className={
                    settings.showInput
                        ? visibleInputClasses
                        : defaultInputClasses
                }
                ref={testTextInputRef}
                disabled={testState === TestState.FINISHED}
                onFocus={handleOnFocus}
                type="text"
                value={userText}
                onChange={(e) => setUserText(e.target.value)}
                onBlur={handleOnBlur}
                autoCapitalize="off"
                autoComplete="off"
            />
            <button onClick={newTest} className="button rounded-full">
                New Test &nbsp; <IoReloadCircle size={20} />{' '}
            </button>
        </>
    );
}
