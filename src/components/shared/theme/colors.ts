/**
 * colors source
 * @external https://mui.com/material-ui/customization/dark-mode/
 */

export interface Theme {
  actionActive: string;
  actionDisabled: string;
  actionDisabledBackground: string;
  actionHover: string;
  actionSelected: string;
  background: string;
  buttonBackground: string;
  divider: string;
  border: string;
  borderPrimary: string;
  textDisabled: string;
  textPrimary: string;
  textSecondary: string;
  type: 'dark' | 'light';
  alerts: ThemeAlerts;
}

export interface ThemeAlerts {
  alertBackground: string;
  alertColor: string;
  infoBackground: string;
  infoColor: string;
  successBackground: string;
  successColor: string;
  errorBackground: string;
  errorColor: string;
  warningBackground: string;
  warningColor: string;
}

export interface PropTheme {
  theme: Theme;
}

const alerts: ThemeAlerts = {
  alertBackground: '#191919',
  alertColor: 'white',
  infoBackground: '#00A3FF',
  infoColor: 'white',
  successBackground: '#27ae60',
  successColor: 'white',
  errorBackground: '#FF005E',
  errorColor: 'white',
  warningBackground: '#FFA800',
  warningColor: 'white',
};

export const darkTheme: Theme = {
  type: 'dark',
  background: '#121212',
  buttonBackground: '#fff',
  textPrimary: `rgba(255,255,255, 0.87)`,
  textSecondary: `rgba(255, 255, 255, 0.5)`,
  textDisabled: `rgba(255, 255, 255, 0.5)`,
  divider: `rgba(255, 255, 255, 0.12)`,
  border: `2px solid rgba(255, 255, 255, 0.12)`,
  borderPrimary: `1px solid rgba(255,255,255, 0.87)`,
  actionActive: `rgba(255,255,255, 0.87)`,
  actionHover: `rgba(255, 255, 255, 0.08)`,
  actionSelected: `rgba(255, 255, 255, 0.16)`,
  actionDisabled: `rgba(255, 255, 255, 0.3)`,
  actionDisabledBackground: `rgba(255, 255, 255, 0.12)`,
  alerts,
};

export const lightTheme: Theme = {
  type: 'light',
  background: '#fff',
  buttonBackground: '#121212',
  textPrimary: `rgba(0, 0, 0, 0.87)`,
  textSecondary: `rgba(0, 0, 0, 0.55)`,
  textDisabled: `rgba(0, 0, 0, 0.55)`,
  divider: `rgba(0, 0, 0, 0.12)`,
  border: `2px solid rgba(0, 0, 0, 0.12)`,
  borderPrimary: `1px solid rgba(0, 0, 0, 0.87)`,
  actionActive: `rgba(0, 0, 0, 0.54)`,
  actionHover: `rgba(0, 0, 0, 0.04)`,
  actionSelected: `rgba(0, 0, 0, 0.08)`,
  actionDisabled: `rgba(0, 0, 0, 0.26)`,
  actionDisabledBackground: `rgba(0, 0, 0, 0.12)`,
  alerts,
};
