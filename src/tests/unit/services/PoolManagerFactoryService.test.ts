import { describe } from 'vitest';

import { PoolManagerFactoryService } from '~/services';
import { deployerAddress, haveFork, mock, poolManagerFactoryContract, provider } from '../__mocks__';

describe.runIf(haveFork && poolManagerFactoryContract)(
  'Testing PoolManagerFactoryService',
  () => {
    const poolManagerFactoryService = new PoolManagerFactoryService(mock, provider, mock);

    it('should fetch all LockManager and PoolManager data', async () => {
      const res = await poolManagerFactoryService.fetchPoolAndLockManagers(deployerAddress);
      expect(res.length).toBeGreaterThanOrEqual(0);
    });

    it('should get a poolManager address', async () => {
      const fee = 500;
      const daiAddress = '0x6B175474E89094C44Da98b954EedeAC495271d0F';
      const address = await poolManagerFactoryService.getPoolManagerAddress(daiAddress, fee);
      expect(address.length).toEqual(42);
    });
  },
  { timeout: 10000 }
);
