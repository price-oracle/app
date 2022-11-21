import { Token } from '~/types/Token';
import UniswapTokens from '~/assets/tokens.uniswap.json';

export const getTokenList: (chainId: number | undefined) => Token[] = (chainId) => {
  if (chainId == 1337) {
    chainId = 1;
  }
  return UniswapTokens.tokens.filter((tok) => tok.chainId == chainId);
};
