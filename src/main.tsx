import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import {
    SettingsContext,
    defaultSettings,
    updateSetting,
} from './util/settings';

import type { CustomFlowbiteTheme } from 'flowbite-react';
import { Flowbite } from 'flowbite-react';

const customTheme: CustomFlowbiteTheme = {
  toggleSwitch: {
    toggle: {
      checked: {
        color:{
          main: "bg-main",
        },
        off: "bg-sub",
      },
    },
  },
};


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <SettingsContext.Provider
            value={{
                settings: defaultSettings,
                updateSetting: updateSetting,
            }}
        >

    <Flowbite theme={{ theme: customTheme }}>
        <App />
    </Flowbite>
        </SettingsContext.Provider>
    </React.StrictMode>
);
