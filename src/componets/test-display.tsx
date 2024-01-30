import { useEffect, useRef } from 'react';
import { useSettings } from '../util/settings';

interface Props {
    userText: string;
    test: string;
    onClick: () => void;
}

export default function TestDisplay({ test, userText, onClick }: Props) {
    const currentLetterRef = useRef<HTMLSpanElement>(null);
    const { settings } = useSettings();
    // drow cursor on current letter
    useEffect(() => {
        if (currentLetterRef.current) {
            // get position of the current letter
            const rect = currentLetterRef.current.getBoundingClientRect();
            const top = rect.top + window.scrollY;
            const left = rect.left + window.scrollX;
            const width = rect.width;
            const cursor = document.getElementById('cursor');
            if (cursor) {
                // set position of the cursor
                cursor.style.top = `${top}px`;
                let cursorLeft = left - 2;
                if (userText.length === test.length) {
                    cursorLeft = left + width;
                }

                cursor.style.left = `${cursorLeft}px`;
            }
        }
    }, [userText, userText, test]);

    return (
        <div onClick={() => onClick()} className="text-display my-4 text-3xl">
            <p id="test-text-p">
                {test.split('').map((letter: string, index: number) => {
                    let style;
                    let hasError = false;
                    if (index < userText.length) {
                        hasError = letter !== userText[index];
                        style = hasError
                            ? {
                                  color: 'var(--default-error)',
                                  textDecoration: 'var(default-error-bg)',
                                  backgroundColor: 'var(--default-error-bg)',
                              }
                            : { color: 'var(--default-text)' };
                    }

                    let hasCursor = index === userText.length;
                    if (userText.length === test.length) {
                        hasCursor = index === userText.length - 1;
                    }
                    return (
                        <span
                            key={index}
                            style={style}
                            ref={hasCursor ? currentLetterRef : null}
                            className={hasCursor ? 'cursor letter' : 'letter'}
                        >
                            {letter}
                            {hasError && settings.showErrorsChars && (
                                <span className="user-error-word">
                                    {userText[index]}
                                </span>
                            )}
                        </span>
                    );
                })}
                <span>&nbsp; &nbsp; &nbsp;</span>
            </p>
            <div id="cursor" className="text-cursor text-3xl">
                &nbsp;
            </div>
        </div>
    );
}
