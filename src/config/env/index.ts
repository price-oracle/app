import { Env } from '~types/Config';

export const getEnv = (): Env => {
  const { NODE_ENV, VITE_ALLOW_DEV_MODE, VITE_ALCHEMY_KEY, CUSTOM_LOCAL_RPC } = import.meta.env;

  return {
    ENV: NODE_ENV,
    ALLOW_DEV_MODE: VITE_ALLOW_DEV_MODE === 'true',
    CUSTOM_LOCAL_RPC: CUSTOM_LOCAL_RPC || '',
    ALCHEMY_KEY: VITE_ALCHEMY_KEY || undefined,
  };
};
