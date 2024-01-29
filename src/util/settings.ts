import { load, save } from './storage';
import { createContext, useCallback, useState } from 'react';

export type SettingsType = {
    wordCount: number;
    showErrorsChars: boolean;
};

export const defaultSettings: SettingsType = {
    wordCount: 10,
    showErrorsChars: false,
};

export function loadSettings(): SettingsType {
    return load('settings') || defaultSettings;
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
}>({
    settings: defaultSettings,
    updateSetting: updateSetting,
});

export function useSettings() {
    const [settings, setSettings] = useState(loadSettings());

    const updateSetting = useCallback(
        (key: keyof SettingsType, value: any) => {
            const newSettings = { ...settings, [key]: value };
            setSettings(newSettings);
            saveSettings(newSettings);
        },
        [settings]
    );

    return { settings, updateSetting };
}
