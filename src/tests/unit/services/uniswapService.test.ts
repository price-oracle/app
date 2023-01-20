import { constants } from 'ethers';
import { describe } from 'vitest';

import { UniswapService } from '~/services';
import { haveFork, multicallService, provider, tokensData, wethToken } from '../__mocks__';

describe.runIf(haveFork)(
  'Testing UniswapService',
  () => {
    const uniswapService = new UniswapService(multicallService, provider);

    it('should fetch pool data of a given array of pool addresses', async () => {
      const poolData = await uniswapService.fetchPoolsData([tokensData.pools['DAI/ETH']]);
      expect(poolData[tokensData.pools['DAI/ETH']]).toHaveProperty('isWethToken0');
      expect(poolData[tokensData.pools['DAI/ETH']]).toHaveProperty('pricing');
    });

    it('should return address zero if does not exist any pool for a given token address', async () => {
      const poolData = await uniswapService.fetchUniswapPools(wethToken.address);

      for (const pool in poolData) {
        if (Object.prototype.hasOwnProperty.call(poolData, pool)) {
          expect(poolData[pool]).toHaveProperty('address');
          expect(poolData[pool].address).toEqual(constants.AddressZero);
        }
      }
    });

    it('should fetch pools data of a given token address', async () => {
      const daiAddress = '0x6B175474E89094C44Da98b954EedeAC495271d0F';
      const poolData = await uniswapService.fetchUniswapPools(daiAddress);

      for (const pool in poolData) {
        if (Object.prototype.hasOwnProperty.call(poolData, pool)) {
          expect(poolData[pool]).toHaveProperty('address');
          expect(poolData[pool]).toHaveProperty('isWethToken0');
          expect(poolData[pool]).toHaveProperty('pricing');
        }
      }
    });
  },
  { timeout: 10000 }
);
