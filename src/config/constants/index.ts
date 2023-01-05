import { Constants } from '~types/Config';
import { addresses } from './addresses';
import { CONFIRMATIONS } from './confirmations';
import { FEE_TIERS } from './feeTiers';
import { ZINDEX } from './misc';

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

    DEFAULT_ALERT_TIMEOUT: 3000,
    ZINDEX,
    FEE_TIERS,
  };
};
