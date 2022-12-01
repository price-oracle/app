import bn from 'bignumber.js';
import { BigNumber, ethers, constants } from 'ethers';

const Q96 = bn('2').pow('96');

export const getSqrtPriceX96ForToken = (tokenToWethAmount: BigNumber, isWethToken0: boolean): BigNumber => {
  const bnPrice = bn(ethers.utils.formatUnits(tokenToWethAmount, 18));
  const pricing = isWethToken0 ? bnPrice : bn('1').div(bnPrice);
  const priceByQ192 = pricing;
  const sqrtOfPrice = priceByQ192.sqrt().multipliedBy(Q96);
  return BigNumber.from(sqrtOfPrice.toFixed(0));
};

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
