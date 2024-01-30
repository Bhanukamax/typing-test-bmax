import { load, save } from './storage';
import { createContext, useCallback, useState } from 'react';

export type SettingsType = {
    wordCount: number;
    showErrorsChars: boolean;
    showInput: boolean;
};

export const defaultSettings: SettingsType = {
    wordCount: 10,
    showErrorsChars: true,
    showInput: false,
};

export function loadSettings(): SettingsType {
    const settings = load('settings') || defaultSettings;
    return { ...defaultSettings, ...settings };
}

export function saveSettings(settings: SettingsType) {
    save('settings', settings);
}

export function updateSetting(key: keyof SettingsType, value: any) {
    const settings = loadSettings();
    //  @ts-ignore
    settings[key] = value;
    saveSettings(settings);
}

export const SettingsContext = createContext<{
    settings: SettingsType;
    updateSetting: (key: keyof SettingsType, value: any) => void;
    saveSettings: (settings: SettingsType) => void;
}>({
    settings: defaultSettings,
    updateSetting: updateSetting,
    saveSettings: saveSettings,
});

export function useSettings() {
    const [settings, setSettings] = useState(loadSettings());

    const save = useCallback(
        (settings: SettingsType) => {
            saveSettings(settings);
            setSettings(settings);
        },
        [settings]
    );

    const updateSetting = useCallback(
        (key: keyof SettingsType, value: any) => {
            const newSettings = { ...settings, [key]: value };
            saveSettings(newSettings);
            setSettings(newSettings);
        },
        [settings]
    );

    return { settings, updateSetting, saveSettings: save };
}
