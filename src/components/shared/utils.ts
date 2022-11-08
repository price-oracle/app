// import BigNumber from 'bignumber.js';

// import { NetworkKey } from '../../features/wallet/state/wallet.interfaces';
// import { IUint256 } from '../../interfaces/IUInt256';

// export const createBlockchainLogoUrl = (networkKey: NetworkKey) =>
//   `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/${networkKey}/info/logo.png`;

export const getMessageFromError = (error: any): string => {
  return error?.message || error || '';
};

// type IBN = number | IUint256 | BigNumber;
// export const toUnit = (value: IBN, decimals?: IBN): BigNumber => {
//   return BNMath.mul(value, decimals || 1e18);
// };

// export const toFixedUnit = (value: IBN, decimals?: IBN): IUint256 => {
//   const base = BNMath.pow(10, decimals || 18);
//   const result = BNMath.mul(value, base).toFixed(0);
//   return result;
// };

export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export interface IStatus {
  error?: any;
  loading?: boolean;
}

export const createStatus = ({ loading, error }: IStatus = {}): IStatus => ({
  loading: loading || false,
  error: error?.stack || error?.message || error || '',
});

export function withProperties<A, B>(component: A, properties: B): A & B {
  Object.keys(properties).forEach((key) => {
    (component as any)[key] = (properties as any)[key];
  });
  return component as A & B;
}

export const getEnumNumberValues = (e: any): number[] =>
  Object.values(e).filter((x) => typeof x === 'number') as number[];

export const getEnumStringValues = (e: any): string[] =>
  Object.values(e).filter((x) => typeof x === 'string') as string[];

// type nsb = number | string | BigNumber;
// export const bn = (n: nsb) => new BigNumber(n);

// export const BNMath = {
//   add: (n1: nsb, n2: nsb) => bn(n1).plus(n2),
//   sub: (minuend: nsb, subtrahend: nsb) => bn(minuend).minus(subtrahend),
//   mul: (n1: nsb, ...others: Array<nsb>) =>
//     others.reduce((acc: BigNumber, curr) => {
//       acc = acc.times(curr);
//       return acc;
//     }, bn(n1)),
//   div: (dividend: nsb, divisor: nsb) => bn(dividend).div(divisor),
//   pow: (base: nsb, exp: nsb) => bn(base).pow(exp),
//   sqrt: (n: nsb) => bn(n).sqrt(),
//   eq: (n1: nsb, n2: nsb) => bn(n1).isEqualTo(n2),
//   bn,
// };

export const toLC = (str?: string) => (str || '').toLowerCase();

// TODO: improve folders: functions should be distruibuted by type, e.g. utils/string, utils/bignumber

// export const fix = (bn: BigNumber | string) => {
//   if (typeof bn === 'string') return bn;

//   if (!bn || bn.isNaN()) return '0';

//   const fixed = bn.toFixed(0);

//   if (fixed === 'NaN') return '0';

//   return fixed;
// };

// export const log = (key: string, ...bns: Array<number | BigNumber>) =>
//   console.log(
//     key,
//     bns.map((b) => bn(b).toFixed())
//   );
