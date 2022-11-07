import { Env } from '~types/Config';

export const getEnv = (): Env => {
  const { NODE_ENV, VITE_ALCHEMY_KEY } = import.meta.env;

  return {
    ENV: NODE_ENV,
    ALCHEMY_KEY: VITE_ALCHEMY_KEY || undefined,
  };
};
