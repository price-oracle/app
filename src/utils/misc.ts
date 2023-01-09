import { ethers } from 'ethers';
import { toUnit } from './format';

export const isValidAddress = (address: string): boolean => {
  try {
    ethers.utils.getAddress(address);
    return true;
  } catch (e) {
    return false;
  }
};

export function withComponents<A, B>(component: A, properties: B): A & B {
  Object.keys(properties as any).forEach((key) => {
    (component as any)[key] = (properties as any)[key];
  });
  return component as A & B;
}

export function formatNumber(
  input: string,
  decimals = 18,
  formatDecimal = 2
): { number: string | number; suffix: string; formatDecimal?: number | undefined } {
  let res: number = Number.parseFloat(input);

  if (decimals !== 0) res = Number.parseFloat(toUnit(input, decimals));

  if (res < 1000) {
    const number = res.toFixed(formatDecimal);
    return { number: number, suffix: '' };
  }

  const formattedNumber = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: formatDecimal,
    notation: 'compact',
    compactDisplay: 'short',
  }).format(res);

  const suffix = formattedNumber.slice(-1);
  const number = formattedNumber.slice(0, -1);
  return { number, suffix };
}

export const getRandomId = (): string => new Date().getTime().toString(36) + Math.random().toString(36).slice(2);

export const formatFee = (value: number | string): number => {
  return Number(value) / 10000;
};

export const sanitizeDecimals = (value: string | undefined, decimals = 18) => {
  if (value && value.includes('.')) {
    return value.split('.')[0] + '.' + value.split('.')[1].slice(0, decimals);
  } else {
    return value ? value : '0';
  }
};
