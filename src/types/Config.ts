import { Network } from './Blockchain';
import { Language, ThemeName } from './Settings';

export interface Env {
  ENV: string;
  ALCHEMY_KEY: string | undefined;
}

export interface Constants {
  STATE_VERSION: number;
  SUPPORTED_NETWORKS: Network[];
  DEFAULT_THEME: ThemeName;
  AVAILABLE_THEMES: ThemeName[];
  DEFAULT_LANG: Language;
  SUPPORTED_LANGS: Language[];
  WETH_ADDRESS: string;
}

export interface Config extends Env, Constants {}
