import { describe } from 'vitest';

import { ERC20Service } from '~/services';
import { deployerAddress, haveFork, mock, multicallService, provider, wethToken } from '../__mocks__';

describe.runIf(haveFork)(
  'Testing ERC20Service call functions',
  () => {
    const erc20Service = new ERC20Service(deployerAddress, mock, mock, multicallService, provider);

    it('should fetch users balance', async () => {
      const balance = await erc20Service.fetchTokenBalance([wethToken.address]);
      expect(balance.toString()).toEqual('0');
    });

    it('should fetch token decimals', async () => {
      const decimals = await erc20Service.fetchTokenDecimals(wethToken.address);
      expect(decimals.toString()).toEqual(wethToken.decimals.toString());
    });

    it('should fetch token symbol', async () => {
      const symbol = await erc20Service.fetchTokenSymbol(wethToken.address);
      expect(symbol.toString()).toEqual(wethToken.symbol);
    });

    it('should fetch token allowance', async () => {
      const allowance = await erc20Service.fetchTokenAllowance([wethToken.address], wethToken.address, deployerAddress);
      expect(allowance.toString()).toEqual('0');
    });

    it('should fetch token data', async () => {
      const data = await erc20Service.fetchTokenData(wethToken.address);
      expect(data).toEqual(wethToken);
    });

    it('should fail if you send an invalid user address', async () => {
      const erc20Service = new ERC20Service('0x', mock, mock, multicallService, provider);
      await expect(erc20Service.fetchTokenBalance([wethToken.address])).rejects.toThrow('invalid address');
    });
  },
  { timeout: 10000 }
);
