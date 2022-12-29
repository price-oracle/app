import { BigNumber } from 'ethers';

import { Address } from '~/types';
import { feeTier } from './miscMocks';

export function getUniswapDataFromPool(poolAddress: Address) {
  /* 
    Given values from Uniswap SDK on mainnet at block 15006161
    with 10 significant figures for prices
  */
  switch (poolAddress) {
    case '0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640': // USDC/ETH 0.05%
      return { price: '1093.211951', sqrtPriceX96: BigNumber.from('2396223915302209821206096838854692') };
    case '0x4e68ccd3e89f51c3074ca5072bbac773960dfa36': // ETH/USDT 0.3%
      return { price: '1096.043129', sqrtPriceX96: BigNumber.from('2622970497268525377831816') };
    case '0xc2e9f25be6257c210d7adf0d4cd6e3e881ba25f8': // DAI/ETH  0.3%
      return { price: '1094.873103', sqrtPriceX96: BigNumber.from('2394405438331503957160036782') };
    case '0xcbcdf9626bc03e24f779434178a73a0b4bad62ed': // WBTC/ETH 0.3%
      return { price: '0.05374720293', sqrtPriceX96: BigNumber.from('34174459123406111203248843457405272') };
    default: // WBTC/ETH 0.3%
      return { price: '1094.873103', sqrtPriceX96: BigNumber.from('2394405438331503957160036782') };
  }
}

export const tokensData = {
  pools: {
    'USDC/ETH': '0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640',
    'ETH/USDT': '0x4e68ccd3e89f51c3074ca5072bbac773960dfa36',
    'DAI/ETH': '0xc2e9f25be6257c210d7adf0d4cd6e3e881ba25f8',
    'WBTC/ETH': '0xcbcdf9626bc03e24f779434178a73a0b4bad62ed',
  },
  USDC: {
    decimals: 6,
  },
  ETH: {
    decimals: 18,
  },
  USDT: {
    decimals: 6,
  },
  WBTC: {
    decimals: 8,
  },
  DAI: {
    decimals: 18,
  },
};

export const uniswapPool = {
  address: tokensData.pools['DAI/ETH'],
  pricing: getUniswapDataFromPool('test').sqrtPriceX96,
  isWethToken0: false,
};

export const uniswapPoolForFeeTierMock = { [feeTier.fee]: uniswapPool };
