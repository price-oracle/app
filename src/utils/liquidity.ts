import { maxLiquidityForAmounts, TickMath } from '@uniswap/v3-sdk';
import { BigNumber } from 'ethers';
import JSBI from 'jsbi';

export const calculateLiquidity = (
  sqrtPriceX96: BigNumber,
  wethAmount: BigNumber,
  tokenAmount: BigNumber,
  isWethToken0: boolean
): BigNumber => {
  return BigNumber.from(
    maxLiquidityForAmounts(
      JSBI.BigInt(sqrtPriceX96),
      TickMath.MIN_SQRT_RATIO,
      TickMath.MAX_SQRT_RATIO,
      JSBI.BigInt(isWethToken0 ? wethAmount : tokenAmount),
      JSBI.BigInt(isWethToken0 ? tokenAmount : wethAmount),
      true
    ).toString()
  );
};
