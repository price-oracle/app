import { FeeTier } from '~/types';

export const FEE_TIERS: { [key: number]: FeeTier } = {
  10000: { hint: 'Best for exotic pairs', fee: 10000, label: '1%' },
  3000: { hint: 'Best for most pairs', fee: 3000, label: '0.3%' },
  500: { hint: 'Best for stable pairs', fee: 500, label: '0.05%' },
  100: { hint: 'Best for very stable pairs', fee: 100, label: '0.01%' },
};
