import { Chain, chain } from 'wagmi';
import { getConfig } from '~/config';

export const getChains = (): Chain[] => {
  const isDev = getConfig().ALLOW_DEV_MODE;

  if (isDev) return [chain.goerli, chain.localhost];

  return [chain.goerli];
};
