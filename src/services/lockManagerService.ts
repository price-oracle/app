import { abi as ILockManager } from '@price-oracle/interfaces/abi/ILockManager.json';
import { useProvider, useAccount, useSigner } from 'wagmi';
import { Contract } from 'ethers-multicall';
import { ethers, constants, BigNumber } from 'ethers';

import { ERC20Service, TxService, MultiCallService, UniswapService } from '~/services';
import { PoolManager, LockManager, Address } from '~/types';
import { humanize } from '~/utils/format';
import { getEthPriceInUSDC, getTokenPrice } from '~/utils';

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

    const balanceCall = lockManagerContract.balanceOf(this.account.address);
    const claimableCall = lockManagerContract.claimable(this.account.address);
    const uniPoolCall = lockManagerContract.pool();

    const [balance, claimable, underlyingUniPool] = await this.multiCallService.multicall([
      balanceCall,
      claimableCall,
      uniPoolCall,
    ]);

    /* 
        I would let 2 rpc-request instead of one 
        because we are going to build a better 
        and independent eth price feed soon
    */
    const usdPerEth = await getEthPriceInUSDC(this.uniswapService);
    const tknPerEth = (await getTokenPrice(this.uniswapService, [underlyingUniPool]))[0];
    const tknPerUsd = constants.WeiPerEther.mul(tknPerEth).div(usdPerEth);

    return {
      address: poolManager.lockManagerAddress,
      locked: balance.toString(),
      rewards: {
        ethReward: claimable[0].toString(),
        ethRewardInUsd: usdPerEth.mul(claimable[0]).div(constants.WeiPerEther).toString(),
        tokenReward: claimable[1].toString(),
        tokenRewardInUsd: constants.WeiPerEther.mul(claimable[1]).div(tknPerUsd).toString(),
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
