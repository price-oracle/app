import { abi as IPoolManagerABI } from '@price-oracle/v1-core-interfaces/abi/IPoolManager.json';
import { BigNumber, ethers, Signer } from 'ethers';

import { ERC20Service, MultiCallService, TxService } from '~/services';
import { Address } from '~/types';

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
      const increaseFullRangeCall = poolManagerContract['increaseFullRangePosition(address,uint128,uint160)'](
        this.address,
        liquidity,
        sqrtPriceX96
      );

      return this.txService.handleTx(increaseFullRangeCall, successMessage, errorMessage);
    }
  }
}
