import { abi as IPoolManagerABI } from '@price-oracle/interfaces/abi/IPoolManager.json';
import { Contract } from 'ethers-multicall';
import { ethers } from 'ethers';
import { useProvider, useAccount, useSigner } from 'wagmi';

import { ERC20Service, TxService, MultiCallService } from '~/services';
import { PoolManager, Address } from '~/types';

export class PoolManagerService {
  signer = useSigner();
  provider = useProvider();
  account = useAccount();
  erc20Service = new ERC20Service();
  multiCallService = new MultiCallService();
  txService = new TxService();

  async fetchPoolManager(poolManagerAddress: string): Promise<PoolManager> {
    const poolManagerContractMulticall = new Contract(poolManagerAddress, IPoolManagerABI);

    const feeCall = poolManagerContractMulticall.fee();
    const tokenCall = poolManagerContractMulticall.token();
    const lockManagerCall = poolManagerContractMulticall.lockManager();
    const claimableCall = poolManagerContractMulticall.claimable(this.account.address);

    const [fee, tokenAddress, lockManagerAddress, rewards] = await this.multiCallService.multicall([
      feeCall,
      tokenCall,
      lockManagerCall,
      claimableCall,
    ]);

    const token = await this.erc20Service.fetchTokenData(tokenAddress);

    return {
      address: poolManagerAddress,
      fee,
      token,
      lockManagerAddress,
      rewards: {
        ethReward: rewards[0].toString(),
        tokenReward: rewards[1].toString(),
      },
    };
  }

  async claimRewards(poolManagerAddress: Address, to: Address) {
    if (this.signer?.data) {
      const poolManagerContract = new ethers.Contract(poolManagerAddress, IPoolManagerABI, this.signer?.data);
      const successMessage = 'Rewards claimed';
      const errorMessage = 'Failed to claim rewards';

      return this.txService.handleTx(await poolManagerContract.claimRewards(to), successMessage, errorMessage);
    }
  }
}
