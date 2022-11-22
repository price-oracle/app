import { abi as IPoolManagerABI } from '@price-oracle/interfaces/abi/IPoolManager.json';
import { Contract } from 'ethers-multicall';
import { useProvider, useAccount } from 'wagmi';
import { PoolManager } from '~/types/PoolManager';
import { ERC20Service } from './erc20Service';
import { MultiCallService } from './multicallService';

export class PoolManagerService {
  provider = useProvider();
  account = useAccount();
  erc20Service = new ERC20Service();
  multiCallService = new MultiCallService();

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

    const tokenSymbol = await this.erc20Service.fetchTokenSymbol(tokenAddress);

    return {
      address: poolManagerAddress,
      fee,
      token: { tokenAddress, tokenSymbol },
      lockManagerAddress,
      rewards: {
        tokenReward: rewards[0].toString(),
        ethReward: rewards[1].toString(),
      },
    };
  }
}
