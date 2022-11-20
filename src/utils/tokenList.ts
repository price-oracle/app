import { Token } from '~/types/Token';
import UniswapTokens from '~/assets/tokens.uniswap.json';

export const TOKEN_LIST: Token[] = UniswapTokens.tokens.filter((tok) => tok.chainId == 1);
