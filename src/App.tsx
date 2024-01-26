import { useState } from 'react';
import { IoCog } from 'react-icons/io5';
import './App.css';
import Settings from './componets/Settings';
import TypingTest from './componets/TypingTest';
import { loadSettings } from './util/settings';

const TEST_SIZE = 10;

enum AppScreen {
    TEST,
    SETTINGS,
}

//const initialScreen = AppScreen.TEST;
const initialScreen = AppScreen.SETTINGS;
const settings = loadSettings();

function App() {
    const [screen, setScreen] = useState(initialScreen);

    return (
        <div className="App">
            <div className="main">
                <div className="header-line">
                    <h1 className="text-4xl font-bold">Typing Test</h1>
                    <button className="border-0 flex bg-none color-sub hover:color-main pointer">
                        <IoCog
                            size="20"
                            onClick={() =>
                                setScreen(
                                    screen === AppScreen.TEST
                                        ? AppScreen.SETTINGS
                                        : AppScreen.TEST
                                )
                            }
                        />
                    </button>
                </div>
                {(() => {
                    switch (screen) {
                        case AppScreen.TEST:
                            return <TypingTest wordCount={settings.wordCount || 10} />;
                        case AppScreen.SETTINGS:
                            return <Settings />
                    }
                })()}
            </div>
        </div>
    );
}

export default App;
