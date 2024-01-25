/*
:root {
--default-error: #ca4754;
    --default-error-bg: #eeaaaa;
    --default-main: #e2b714;
    --default-sub: #ffffff;
    --default-bg: #444444;
    --default-text: #2fffee;
}
 */

export type Theme = {
    defaultError: string
    defaultErrorBg: string
    defaultMain: string
    defaultSub: string
    defaultBg: string
    defaultText: string
}

export const defaultTheme: Theme = {
    defaultError: '#ca4754',
    defaultErrorBg: '#eeaaaa',
    defaultMain: '#e2b714',
    defaultSub: '#ffffff',
    defaultBg: '#444444',
    defaultText: '#2fffee',
}

export const monkeyTheme: Theme = {
    defaultError: '#ca4754',
    defaultErrorBg: '#664444',
    defaultMain: '#e2b714',
    defaultSub: '#646669',
    defaultBg: '#323437',
    defaultText: '#d1d0c5',
}

export enum Themes {
    DEFAULT = 'default',
    MONKEY = 'monkey',
}

export function setThemeVariables(theme: Theme) {
    document.documentElement.style.setProperty(
        '--default-error',
        theme.defaultError
    )
    document.documentElement.style.setProperty(
        '--default-error-bg',
        theme.defaultErrorBg
    )
    document.documentElement.style.setProperty(
        '--default-main',
        theme.defaultMain
    )
    document.documentElement.style.setProperty(
        '--default-sub',
        theme.defaultSub
    )
    document.documentElement.style.setProperty('--default-bg', theme.defaultBg)
    document.documentElement.style.setProperty(
        '--default-text',
        theme.defaultText
    )
}

export function setTheme(theme: Themes) {
    switch (theme) {
        case Themes.DEFAULT:
            setThemeVariables(defaultTheme)
            break
        case Themes.MONKEY:
            setThemeVariables(monkeyTheme)
            break
    }
}
