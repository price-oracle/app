import { Network } from './Blockchain';
import { Theme, Language } from './Settings';

export interface Env {
  ENV: string;
  ALCHEMY_KEY: string | undefined;
}

export interface Constants {
  STATE_VERSION: number;
  SUPPORTED_NETWORKS: Network[];
  DEFAULT_THEME: Theme;
  AVAILABLE_THEMES: Theme[];
  DEFAULT_LANG: Language;
  SUPPORTED_LANGS: Language[];
}

export interface Config extends Env, Constants {}
