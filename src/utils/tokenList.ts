import { isUndefined } from 'lodash';

import { Token } from '~/types';
import UniswapTokens from '~/assets/tokens.uniswap.json';
import { getConstants } from '~/config/constants';

export const getTokenList: (chainId: number | undefined) => Token[] = (chainId) => {
  // This is needed because we fork from mainnet and
  // need to show those tokens while testing on localhost
  // checking undefined is needed in case wallet is not connected we go to the default chainId
  if (chainId == 1337 || isUndefined(chainId)) {
    chainId = getConstants().DEFAULT_CHAIN_ID;
  }
  return UniswapTokens.tokens.filter((tok) => tok.chainId == chainId);
};
