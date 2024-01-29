import { useEffect, useState } from 'react';
import { IoCog, IoArrowBack } from 'react-icons/io5';
import './App.scss';
import Settings from './componets/Settings';
import TypingTest from './componets/TypingTest';
import { loadSettings, SettingsType, useSettings } from './util/settings';

const TEST_SIZE = 10;

enum AppScreen {
    TEST,
    SETTINGS,
}

const initialScreen = AppScreen.TEST;
//const initialScreen = AppScreen.SETTINGS;

function App() {
    const [screen, setScreen] = useState(initialScreen);
    const { settings, saveSettings } = useSettings();

    const onSave = (settings: SettingsType) => {
        saveSettings(settings);
        setScreen(AppScreen.TEST);
    };

    return (
        <div className="App">
            <div className="main">
                <div className="header-line flex flex-col">
                    <h1 className="text-4xl font-bold">Typing Test</h1>
                    <button
                        className="border-0 flex bg-none color-sub hover:color-main pointer items-center"
                        onClick={() =>
                            setScreen(
                                screen === AppScreen.TEST
                                    ? AppScreen.SETTINGS
                                    : AppScreen.TEST
                            )
                        }
                    >
                        {screen === AppScreen.SETTINGS ? (
                            <IoArrowBack size="25" className="mr-1" />
                        ) : (
                            <IoCog size="25" className="mr-1" />
                        )}
                        {screen === AppScreen.SETTINGS ? 'go back' : 'settings'}
                    </button>
                </div>
                {(() => {
                    switch (screen) {
                        case AppScreen.TEST:
                            return (
                                <TypingTest
                                    wordCount={settings.wordCount || 10}
                                />
                            );
                        case AppScreen.SETTINGS:
                            return (
                                <Settings onSave={onSave} settings={settings} />
                            );
                    }
                })()}
            </div>
        </div>
    );
}

export default App;
