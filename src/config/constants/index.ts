import { Constants } from '~types/Config';
import { addresses } from './addresses';
import { CONFIRMATIONS } from './confirmations';
import { FEE_TIERS } from './feeTiers';

export const getConstants = (): Constants => {
  return {
    STATE_VERSION: 1,
    SUPPORTED_NETWORKS: ['mainnet'],
    DEFAULT_THEME: 'dark',
    AVAILABLE_THEMES: ['light', 'dark'],
    DEFAULT_LANG: 'en',
    SUPPORTED_LANGS: ['en'],

    WETH_DECIMALS: 18,

    ADDRESSES: addresses,
    CONFIRMATIONS,
    FEE_TIERS,
  };
};
