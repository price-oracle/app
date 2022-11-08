import { Env } from '~types/Config';

export const getEnv = (): Env => {
  const { NODE_ENV, VITE_ALLOW_DEV_MODE, VITE_ALCHEMY_KEY } = import.meta.env;

  return {
    ENV: NODE_ENV,
    ALLOW_DEV_MODE: VITE_ALLOW_DEV_MODE === 'true',
    ALCHEMY_KEY: VITE_ALCHEMY_KEY || undefined,
  };
};
