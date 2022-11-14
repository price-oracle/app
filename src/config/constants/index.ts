import { Constants } from '~types/Config';
import { addresses } from './addresses';

export const getConstants = (): Constants => {
  return {
    STATE_VERSION: 1,
    SUPPORTED_NETWORKS: ['mainnet'],
    DEFAULT_THEME: 'dark',
    AVAILABLE_THEMES: ['light', 'dark'],
    DEFAULT_LANG: 'en',
    SUPPORTED_LANGS: ['en'],

    ADDRESSES: addresses,
  };
};
