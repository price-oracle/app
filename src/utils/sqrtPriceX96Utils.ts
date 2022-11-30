import { BigNumber, constants } from 'ethers';

export const sqrtPriceX96ToPrice = (sqrtPriceX96: BigNumber, isWethToken0: boolean): BigNumber => {
  const two = constants.Two;
  const numerator = sqrtPriceX96.pow(two);
  const denominator = two.pow(192);
  if (isWethToken0) {
    return constants.WeiPerEther.mul(numerator).div(denominator);
  } else {
    return constants.WeiPerEther.mul(denominator).div(numerator);
  }
};
