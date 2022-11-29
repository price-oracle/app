import { BigNumber, utils } from 'ethers';

export const sqrtPriceX96ToPrice = (sqrtPriceX96: BigNumber, isWethToken0: boolean): BigNumber => {
  const two = BigNumber.from('2');
  const oneEther = utils.parseEther('1');
  const numerator = sqrtPriceX96.pow(two);
  const denominator = two.pow(192);
  if (isWethToken0) {
    return oneEther.mul(numerator).div(denominator);
  } else {
    return oneEther.mul(denominator).div(numerator);
  }
};
