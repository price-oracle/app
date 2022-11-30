import { BigNumber, constants } from 'ethers';

export const sqrtPriceX96ToPrice = (sqrtPriceX96: BigNumber, isWethToken0: boolean): BigNumber => {
  const two = constants.Two;
  const oneEther = constants.WeiPerEther;
  const numerator = sqrtPriceX96.pow(two);
  const denominator = two.pow(192);
  if (isWethToken0) {
    return oneEther.mul(numerator).div(denominator);
  } else {
    return oneEther.mul(denominator).div(numerator);
  }
};
