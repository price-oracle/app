import { abi as IPoolManagerABI } from '@price-oracle/interfaces/abi/IPoolManager.json';
import { BigNumber, ethers, Signer } from 'ethers';
import { Contract } from 'ethers-multicall';
import { isUndefined } from 'lodash';

import { ERC20Service, MultiCallService, TxService } from '~/services';
import { Address, PoolManager } from '~/types';

export class PoolManagerService {
  signer: Signer | undefined;
  address: Address | undefined;
  erc20Service: ERC20Service;
  multiCallService: MultiCallService;
  txService: TxService;

  constructor(
    address: Address | undefined,
    signer: Signer | undefined,
    txService: TxService,
    multiCallService: MultiCallService,
    erc20Service: ERC20Service
  ) {
    this.address = address;
    this.signer = signer;
    this.txService = txService;
    this.multiCallService = multiCallService;
    this.erc20Service = erc20Service;
  }

  async fetchPoolManager(poolManagerAddress: string): Promise<PoolManager> {
    const poolManagerContractMulticall = new Contract(poolManagerAddress, IPoolManagerABI);
    const feeCall = poolManagerContractMulticall.fee();
    const tokenCall = poolManagerContractMulticall.token();
    const lockManagerCall = poolManagerContractMulticall.lockManager();
    const claimableCall = this.address && poolManagerContractMulticall.claimable(this.address);
    const poolLiquidityCall = poolManagerContractMulticall.poolLiquidity();
    const userSeedBalanceCall = this.address && poolManagerContractMulticall.seederBalance(this.address);
    const wethToken0Call = poolManagerContractMulticall.isWethToken0();

    const calls = [
      feeCall,
      tokenCall,
      lockManagerCall,
      wethToken0Call,
      poolLiquidityCall,
      claimableCall,
      userSeedBalanceCall,
    ].filter((call) => !isUndefined(call));

    const [fee, tokenAddress, lockManagerAddress, isWethToken0, poolLiquidity, rewards, userSeedBalance] =
      await this.multiCallService.multicall(calls);
    const token = await this.erc20Service.fetchTokenData(tokenAddress);

    return {
      address: poolManagerAddress,
      fee,
      token,
      lockManagerAddress,
      rewards: rewards && {
        ethReward: rewards[0].toString(),
        tokenReward: rewards[1].toString(),
      },
      userSeedBalance: userSeedBalance && userSeedBalance.toString(),
      poolLiquidity: poolLiquidity.toString(),
      isWethToken0,
    };
  }

  async claimRewards(poolManagerAddress: Address, to: Address) {
    if (this.signer) {
      const poolManagerContract = new ethers.Contract(poolManagerAddress, IPoolManagerABI, this.signer);
      const successMessage = 'Rewards claimed';
      const errorMessage = 'Failed to claim rewards';

      return this.txService.handleTx(poolManagerContract.claimRewards(to), successMessage, errorMessage);
    }
  }

  async increaseFullRangePosition(poolManagerAddress: Address, liquidity: BigNumber, sqrtPriceX96: BigNumber) {
    if (this.signer && this.address) {
      const poolManagerContract = new ethers.Contract(poolManagerAddress, IPoolManagerABI, this.signer);
      const successMessage = 'Sucesfully added liquidity';
      const errorMessage = 'Failed to add liquidity';

      //This is needed to call the overloaded function in the contract
      const increaseFullRangeCall = poolManagerContract['increaseFullRangePosition(address,uint128,uint160,bool)'](
        this.address,
        liquidity,
        sqrtPriceX96,
        false
      );

      return this.txService.handleTx(increaseFullRangeCall, successMessage, errorMessage);
    }
  }
}
