interface Props {
    userText: string;
  test: string;
  onClick: () => void;
}
export default function TestDisplay({ test, userText, onClick }: Props) {
    return (
        <div onClick={() => onClick()}>
            <h2>
                {test.split('').map((letter: string, index: number) => {
                    let style;
                    let correct = true;
                    if (index < userText.length) {
                      correct = letter !== userText[index]
                      style = correct ? { color: '#ee4e44', textDecoration: 'italic', backgroundColor: "white"} : { color: '#2fffee' };
                    }


                  let hasCursor = index === userText.length;
                    return (
                        <span key={index} style={style} className={hasCursor ? 'cursor letter' : 'letter'}>
                            {letter}
                        </span>
                    )
                })}
            </h2>

            {/* <h3>{userText}</h3>
            <h3>{test}</h3> */}
        </div>
    )
}
