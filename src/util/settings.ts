import { load, save } from "./storage"

export type SettingsType = {
 wordCount: number
}

const defaultSettings: SettingsType = {
  wordCount: 10
}

export function loadSettings(): SettingsType {
  return load("settings") || defaultSettings
}


export function saveSettings(settings: SettingsType) {
  save("settings", settings)
}

export function updateSetting(key: keyof SettingsType, value: any) {
    const settings = loadSettings()
    settings[key] = value
    saveSettings(settings)
}
