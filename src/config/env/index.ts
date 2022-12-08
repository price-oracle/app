import { Env } from '~types/Config';

export const getEnv = (): Env => {
  const { NODE_ENV, VITE_ALLOW_DEV_MODE, VITE_ALCHEMY_KEY, VITE_CUSTOM_RPC } = import.meta.env;

  return {
    ENV: NODE_ENV,
    ALLOW_DEV_MODE: VITE_ALLOW_DEV_MODE === 'true',
    CUSTOM_RPC: VITE_CUSTOM_RPC || '',
    ALCHEMY_KEY: VITE_ALCHEMY_KEY || undefined,
  };
};
