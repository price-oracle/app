import { Constants } from '~types/Config';

export const getConstants = (): Constants => {
  return {
    STATE_VERSION: 1,
    SUPPORTED_NETWORKS: ['mainnet'],
    DEFAULT_THEME: 'system-prefs',
    AVAILABLE_THEMES: ['system-prefs', 'light', 'dark'],
    DEFAULT_LANG: 'en',
    SUPPORTED_LANGS: ['en'],
  };
};
