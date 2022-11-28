import BigNumber from 'bignumber.js';
import { BigNumberish, ethers } from 'ethers';

export type DataType = 'amount' | 'percent' | 'usd';

export const USDC_DECIMALS = 6;
export const WETH_DECIMALS = 18;
export const GWEI = 9;

const FORMAT = {
  prefix: '',
  decimalSeparator: '.',
  groupSeparator: ',',
  groupSize: 3,
  secondaryGroupSize: 0,
  fractionGroupSeparator: ' ',
  fractionGroupSize: 0,
  suffix: '',
};

/* -------------------------------------------------------------------------- */
/*                                    Parse                                   */
/* -------------------------------------------------------------------------- */

export const toBN = (amount?: string | number): BigNumber => {
  return new BigNumber(amount || 0);
};

export const toWei = (amount: string, decimals?: number): string => {
  const ONE_UNIT = toBN(10).pow(decimals || WETH_DECIMALS);
  return toBN(amount).times(ONE_UNIT).toFixed(0);
};

export const toUnit = (amount: string | undefined, decimals?: number): string => {
  const ONE_UNIT = toBN(10).pow(decimals || WETH_DECIMALS);
  return toBN(amount).div(ONE_UNIT).toString();
};

/* -------------------------------------------------------------------------- */
/*                                  Normalize                                 */
/* -------------------------------------------------------------------------- */

export const normalize = (dataType: DataType, amount?: string, decimals?: number): string => {
  if (!amount || amount === '') amount = '0';
  switch (dataType) {
    case 'amount':
      if (!decimals) throw new Error('Invalid Decimals to Format Amount');
      return normalizeAmount(amount, decimals);
    case 'percent':
      return normalizePercent(amount);
    case 'usd':
      return normalizeUsdc(amount);
    default:
      throw new Error('Invalid Format Data Type');
  }
};

export const normalizeAmount = (amount: string | undefined, decimals: number): string => toUnit(amount, decimals);

export const normalizePercent = (amount: string): string => toUnit(amount, 4);

export const normalizeUsdc = (amount?: string): string => toUnit(amount, USDC_DECIMALS);

/* -------------------------------------------------------------------------- */
/*                                   Format                                   */
/* -------------------------------------------------------------------------- */

export const format = (dataType: DataType, amount?: string, decimals?: number): string => {
  if (!amount || amount === '') amount = '0';

  switch (dataType) {
    case 'amount':
      if (!decimals) throw new Error('Invalid Decimals to Format Amount');
      return formatAmount(amount, decimals);
    case 'percent':
      return formatPercent(amount, decimals);
    case 'usd':
      return formatUsd(amount, decimals);
    default:
      throw new Error('Invalid Format Data Type');
  }
};

export const formatAmount = (amount: string, decimals: number): string =>
  toBN(amount).toFormat(decimals, BigNumber.ROUND_FLOOR, FORMAT);

export const formatPercent = (amount: string, decimals = 2): string =>
  toBN(amount)
    .times(100)
    .toFormat(decimals, { ...FORMAT, suffix: '%' });

export const formatUsd = (amount?: string, decimals = 2): string =>
  toBN(amount).toFormat(decimals, { ...FORMAT, prefix: '$ ' });

/* -------------------------------------------------------------------------- */
/*                                  Humanize                                  */
/* -------------------------------------------------------------------------- */

export const humanize = (
  dataType: DataType,
  amount: string | undefined,
  tokenDecimals?: number,
  formatDecimals?: number
) => {
  if (!tokenDecimals && dataType === 'amount') return '0';
  const units = normalize(dataType, amount, tokenDecimals);
  return format(dataType, units, formatDecimals);
};

/* -------------------------------------------------------------------------- */
/*                                  Others                                    */
/* -------------------------------------------------------------------------- */

export const weiToUnit = (amount: BigNumber) => toUnit(amount.toString());
export const unitToWei = (amount: string) => toWei(amount);

export const ethersValueToBN = (amount: BigNumberish | undefined) => toBN(toUnit(amount?.toString()));
export const BNToEthersValue = (amount: BigNumber, decimals?: number): BigNumberish =>
  ethers.BigNumber.from(toWei(amount.toString(), decimals));
