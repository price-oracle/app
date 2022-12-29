import { FeeTier, Token } from '~/types';

export const token: Token = {
  address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  name: 'Token Test',
  symbol: 'TST-TKN',
  decimals: 18,
  logoURI: 'test',
};

export const feeTier: FeeTier = { hint: 'Best for exotic pairs', fee: 10000, label: '1%' };
