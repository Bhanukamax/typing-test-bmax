interface Props {
    userText: string;
    test: string;
    onClick: () => void;
}

export default function TestDisplay({ test, userText, onClick }: Props) {
    return (
        <div onClick={() => onClick()} className="text-display">
            <h2>
                {test.split('').map((letter: string, index: number) => {
                    let style;
                    let correct = true;
                    if (index < userText.length) {
                        correct = letter !== userText[index];
                        style = correct
                            ? {
                                  color: 'var(--default-error)',
                                  textDecoration: 'var(default-error-bg)',
                                  backgroundColor: 'var(--default-error-bg)',
                              }
                            : { color: 'var(--default-text)' };
                    }

                    let hasCursor = index === userText.length;
                    return (
                        <span
                            key={index}
                            style={style}
                            className={hasCursor ? 'cursor letter' : 'letter'}
                        >
                            {letter}
                        </span>
                    );
                })}
                <span>&nbsp; &nbsp; &nbsp;</span>
            </h2>

            {/* <h3>{userText}</h3>
            <h3>{test}</h3> */}
        </div>
    );
}
