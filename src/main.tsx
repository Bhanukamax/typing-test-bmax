import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import {
    SettingsContext,
    defaultSettings,
    updateSetting,
} from './util/settings';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <SettingsContext.Provider
            value={{
                settings: defaultSettings,
                updateSetting: updateSetting,
            }}
        >
            <App />
        </SettingsContext.Provider>
    </React.StrictMode>
);
