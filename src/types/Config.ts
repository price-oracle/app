import { Address, Network } from './Blockchain';
import { FeeTier } from './FeeTiers';
import { Language, ThemeName } from './Settings';

export interface Env {
  ENV: string;
  ALLOW_DEV_MODE: boolean;
  CUSTOM_RPC: string;
  ALCHEMY_KEY: string | undefined;
  CUSTOM_LOCAL_RPC: string;
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
    UNISWAP_V3_FACTORY: Address;
    ZERO_ADDRESS: Address;
    MULTICALL_ADDRESS: Address;
  };

  CONFIRMATIONS: { [key: number]: number };

  DEFAULT_ALERT_TIMEOUT: number;
  FEE_TIERS: { [key: number]: FeeTier };
}

export interface Config extends Env, Constants {}
