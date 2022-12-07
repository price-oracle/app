import { ethers, BigNumber } from 'ethers';
import { abi as ILockManager } from '@price-oracle/interfaces/abi/ILockManager.json';
import { useProvider, useAccount, useSigner } from 'wagmi';
import { Contract } from 'ethers-multicall';
import { isUndefined } from 'lodash';

import { ERC20Service, TxService, MultiCallService, UniswapService } from '~/services';
import { PoolManager, LockManager, Address } from '~/types';
import { humanize } from '~/utils/format';
import { getTokenPrice } from '~/utils';

export class LockManagerService {
  txService = new TxService();
  provider = useProvider();
  account = useAccount();
  signer = useSigner();
  erc20Service = new ERC20Service();
  multiCallService = new MultiCallService();
  uniswapService = new UniswapService();

  async fetchUserLockedAmount(poolManager: PoolManager): Promise<LockManager> {
    const lockManagerContract = new Contract(poolManager.lockManagerAddress, ILockManager);

    const balanceCall = this.account.address && lockManagerContract.balanceOf(this.account.address);
    const claimableCall = this.account.address && lockManagerContract.claimable(this.account.address);
    const uniPoolCall = lockManagerContract.pool();

    const calls = [uniPoolCall, balanceCall, claimableCall].filter((call) => !isUndefined(call));

    const [underlyingUniPool, balance, claimable] = await this.multiCallService.multicall(calls);

    const tknPerEth = (await getTokenPrice(this.uniswapService, [underlyingUniPool]))[0];

    return {
      address: poolManager.lockManagerAddress,
      locked: balance && balance.toString(),
      rewards: claimable && {
        ethReward: claimable[0].toString(),
        tokenReward: claimable[1].toString(),
        tokenPerEth: tknPerEth.toString(),
      },
    };
  }

  async lock(lockManagerAddress: Address, amount: BigNumber) {
    if (this.signer?.data) {
      const lockManagerContract = new ethers.Contract(lockManagerAddress, ILockManager, this.signer?.data);
      const successMessage = `Successfully locked ${humanize('amount', amount.toString(), 18, 2)} ETH`;
      const errorMessage = `Failed to lock ${humanize('amount', amount.toString(), 18, 2)} ETH`;

      return this.txService.handleTx(lockManagerContract.lock(amount), successMessage, errorMessage);
    }
  }

  async claimRewards(lockManagerAddress: Address, to: Address) {
    if (this.signer?.data) {
      const lockManagerContract = new ethers.Contract(lockManagerAddress, ILockManager, this.signer?.data);
      const successMessage = 'Rewards claimed';
      const errorMessage = 'Failed to claim rewards';

      return this.txService.handleTx(lockManagerContract.claimRewards(to), successMessage, errorMessage);
    }
  }
}
