import { load, save } from './storage';

export type SettingsType = {
    wordCount: number;
    showErrorsChars: boolean;
};

const defaultSettings: SettingsType = {
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
