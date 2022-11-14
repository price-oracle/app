import { Address, Network } from './Blockchain';
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

  ADDRESSES: {
    WETH_ADDRESS: Address;
    deployed: {
      POOL_MANAGER_FACTORY: Address;
    };
  };
}

export interface Config extends Env, Constants {}
