import { vi } from 'vitest';
import { utils } from 'ethers';

import { getUniswapDataFromPool, tokensData } from '~/tests';
import { getSqrtPriceX96ForToken } from '~/utils';

describe('Testing getSqrtPriceX96ForToken function', () => {
  const getDataFromPoolMock = vi.fn().mockImplementation(getUniswapDataFromPool);

  afterAll(() => {
    vi.restoreAllMocks();
  });

  it('Should return sqrtPriceX96 when both tokens have same decimals', async () => {
    const dataFromUniSDK = getDataFromPoolMock(tokensData.pools['DAI/ETH']);
    const sqrtPriceX96 = getSqrtPriceX96ForToken(
      utils.parseUnits(dataFromUniSDK.price, tokensData.DAI.decimals),
      false
    );
    const numberLenght = sqrtPriceX96.toString().length;

    // should have a margin error less than 0.0000000001%
    expect(utils.formatUnits(sqrtPriceX96, numberLenght)).toBeCloseTo(
      Number(utils.formatUnits(dataFromUniSDK.sqrtPriceX96, numberLenght)),
      10
    );
  });

  it('Should return sqrtPriceX96 when ETH is token0', async () => {
    const dataFromUniSDK = getDataFromPoolMock(tokensData.pools['ETH/USDT']);
    const sqrtPriceX96 = getSqrtPriceX96ForToken(
      utils.parseUnits(dataFromUniSDK.price, tokensData.USDT.decimals),
      true
    );
    const numberLenght = sqrtPriceX96.toString().length;

    // should have a margin error less than 0.0000000001%
    expect(utils.formatUnits(sqrtPriceX96, numberLenght)).toBeCloseTo(
      Number(utils.formatUnits(dataFromUniSDK.sqrtPriceX96, numberLenght)),
      10
    );
  });

  it('Should return sqrtPriceX96 when ETH isnt token0', async () => {
    const dataFromUniSDK = getDataFromPoolMock(tokensData.pools['USDC/ETH']);
    const sqrtPriceX96 = getSqrtPriceX96ForToken(
      utils.parseUnits(dataFromUniSDK.price, tokensData.USDC.decimals),
      false
    );
    const numberLenght = sqrtPriceX96.toString().length;

    // should have a margin error less than 0.0000000001%
    expect(utils.formatUnits(sqrtPriceX96, numberLenght)).toBeCloseTo(
      Number(utils.formatUnits(dataFromUniSDK.sqrtPriceX96, numberLenght)),
      10
    );
  });
});
