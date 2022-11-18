import { Address, Network } from './Blockchain';
import { FeeTier } from './FeeTiers';
import { Language, ThemeName } from './Settings';

export interface Env {
  ENV: string;
  ALLOW_DEV_MODE: boolean;
  ALCHEMY_KEY: string | undefined;
}

export interface Constants {
  STATE_VERSION: number;
  SUPPORTED_NETWORKS: Network[];
  DEFAULT_THEME: ThemeName;
  AVAILABLE_THEMES: ThemeName[];
  DEFAULT_LANG: Language;
  SUPPORTED_LANGS: Language[];

  WETH_DECIMALS: number;

  ADDRESSES: {
    WETH_ADDRESS: Address;
    deployed: {
      POOL_MANAGER_FACTORY: Address;
    };
  };

  CONFIRMATIONS: { [key: number]: number };

  FEE_TIERS: { [key: string]: FeeTier };
}

export interface Config extends Env, Constants {}
