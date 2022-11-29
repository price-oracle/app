import { BigNumber } from 'ethers';

export const sqrtPriceX96ToPrice = (sqrtPriceX96: BigNumber): BigNumber => {
  const two = BigNumber.from('2');
  const numerator = sqrtPriceX96.pow(two);
  const denominator = two.pow(192);
  return numerator.div(denominator);
};
