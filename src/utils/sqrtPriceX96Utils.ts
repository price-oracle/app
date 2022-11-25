import BigNumber from 'bignumber.js';

export const sqrtPriceX96ToPrice = (sqrtPriceX96: BigNumber): BigNumber => {
  return sqrtPriceX96.dividedBy(2 ** 96).exponentiatedBy(2);
};
