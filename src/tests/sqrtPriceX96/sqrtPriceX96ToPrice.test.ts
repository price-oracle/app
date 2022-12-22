import { vi } from 'vitest';
import { utils } from 'ethers';

import { getUniswapDataFromPool, tokensData } from '~/tests';
import { sqrtPriceX96ToPrice } from '~/utils';

describe('Testing sqrtPriceX96toPrice function', () => {
  const getDataFromPoolMock = vi.fn().mockImplementation(getUniswapDataFromPool);

  afterAll(() => {
    vi.restoreAllMocks();
  });

  it('Should return ETH price when both tokens have same decimals', async () => {
    const dataFromUniSDK = getDataFromPoolMock(tokensData.pools['DAI/ETH']);
    const price = sqrtPriceX96ToPrice(dataFromUniSDK.sqrtPriceX96, false);
    const formattedPrice = utils.formatUnits(price, tokensData.DAI.decimals);

    // should have a margin error less than 0.000001%
    expect(formattedPrice).toBeCloseTo(dataFromUniSDK.price, 6);
  });

  it('Should return ETH price when both tokens have different decimals', async () => {
    const dataFromUniSDK = getDataFromPoolMock(tokensData.pools['WBTC/ETH']);
    const price = sqrtPriceX96ToPrice(dataFromUniSDK.sqrtPriceX96, false);
    const formattedPrice = utils.formatUnits(price, tokensData.WBTC.decimals);

    // should have a margin error less than 0.000001%
    expect(formattedPrice).toBeCloseTo(dataFromUniSDK.price, 6);
  });

  it('Should return ETH price when ETH is token0', async () => {
    const dataFromUniSDK = getDataFromPoolMock(tokensData.pools['ETH/USDT']);
    const price = sqrtPriceX96ToPrice(dataFromUniSDK.sqrtPriceX96, true);
    const formattedPrice = utils.formatUnits(price, tokensData.USDT.decimals);

    // should have a margin error less than 0.000001%
    expect(formattedPrice).toBeCloseTo(dataFromUniSDK.price, 6);
  });

  it('Should return ETH price when ETH isnt token0', async () => {
    const dataFromUniSDK = getDataFromPoolMock(tokensData.pools['USDC/ETH']);
    const price = sqrtPriceX96ToPrice(dataFromUniSDK.sqrtPriceX96, false);
    const formattedPrice = utils.formatUnits(price, tokensData.USDC.decimals);

    // should have a margin error less than 0.000001%
    expect(formattedPrice).toBeCloseTo(dataFromUniSDK.price, 6);
  });
});
