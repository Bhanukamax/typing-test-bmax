import { load, save } from "./storage"

type Settings = {
 wordCount: number
}

const defaultSettings: Settings = {
  wordCount: 10
}

export function loadSettings(): Settings {
  return load("settings") || defaultSettings
}


export function saveSettings(settings: Settings) {
  save("settings", settings)
}

export function updateSetting(key: keyof Settings, value: any) {
    const settings = loadSettings()
    settings[key] = value
    saveSettings(settings)
}
