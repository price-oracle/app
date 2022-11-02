import { DefaultTheme } from 'styled-components';
import { darkTheme, lightTheme } from './colors';

interface PropTheme {
    theme: DefaultTheme;
}

let darkThemeEnabled = true;
export const THEME = darkThemeEnabled ? darkTheme : lightTheme;

export const toggleTheme = () => darkThemeEnabled = !darkThemeEnabled;

export const THEME_BACKGROUND = (props: PropTheme) => THEME.background;

export const THEME_TEXT_PRIMARY = (props: PropTheme) => THEME.textPrimary;

export const THEME_TEXT_SECONDARY = (props: PropTheme) =>
    THEME.textSecondary;

export const THEME_DISABLED = (props: PropTheme) => THEME.textDisabled;

export const THEME_DIVIDER = (props: PropTheme) => THEME.divider;

export const THEME_BORDER = (props: PropTheme) =>
    `2px solid ${THEME.divider}`;

export const THEME_ACTION_ACTIVE = (props: PropTheme) =>
    THEME.actionActive;

export const THEME_ACTION_DISABLED = (props: PropTheme) =>
    THEME.actionDisabled;

export const THEME_ACTION_DISABLED_BACKGROUND = (props: PropTheme) =>
    THEME.actionDisabledBackground;

export const THEME_ACTION_HOVER = (props: PropTheme) => THEME.actionHover;

export const THEME_ACTION_SELECTED = (props: PropTheme) =>
    THEME.actionSelected;
