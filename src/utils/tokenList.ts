import { Token } from '~/types/Token';
import UniswapTokens from '~/assets/tokens.uniswap.json';

export const getTokenList: (chainId: number | undefined) => Token[] = (chainId) => {
  // This is needed because we fork from mainnet and
  //  need to show those tokens while testing on localhost
  if (chainId == 1337) {
    chainId = 1;
  }
  return UniswapTokens.tokens.filter((tok) => tok.chainId == chainId);
};
