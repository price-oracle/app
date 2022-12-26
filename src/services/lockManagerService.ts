import { abi as ILockManager } from '@price-oracle/interfaces/abi/ILockManager.json';
import { Provider } from '@wagmi/core';
import { BigNumber, ethers, Signer } from 'ethers';
import { Contract } from 'ethers-multicall';
import { isUndefined } from 'lodash';

import { ERC20Service, MultiCallService, TxService, UniswapService } from '~/services';
import { Address, LockManager, PoolManager } from '~/types';
import { getTokenPrice } from '~/utils';
import { humanize } from '~/utils/format';

export class LockManagerService {
  address: Address | undefined;
  provider: Provider;
  signer: Signer | undefined;
  txService: TxService;
  erc20Service: ERC20Service;
  multiCallService: MultiCallService;
  uniswapService: UniswapService;

  constructor(
    address: Address | undefined,
    provider: Provider,
    signer: Signer | undefined,
    txService: TxService,
    erc20Service: ERC20Service,
    multiCallService: MultiCallService,
    uniswapService: UniswapService
  ) {
    this.txService = txService;
    this.erc20Service = erc20Service;
    this.multiCallService = multiCallService;
    this.uniswapService = uniswapService;
    this.address = address;
    this.signer = signer;
    this.provider = provider;
  }

  async lock(lockManagerAddress: Address, amount: BigNumber) {
    if (this.signer) {
      const lockManagerContract = new ethers.Contract(lockManagerAddress, ILockManager, this.signer);
      const successMessage = `Successfully locked ${humanize('amount', amount.toString(), 18, 2)} ETH`;
      const errorMessage = `Failed to lock ${humanize('amount', amount.toString(), 18, 2)} ETH`;

      return this.txService.handleTx(lockManagerContract.lock(amount), successMessage, errorMessage);
    }
  }

  async claimRewards(lockManagerAddress: Address, to: Address) {
    if (this.signer) {
      const lockManagerContract = new ethers.Contract(lockManagerAddress, ILockManager, this.signer);
      const successMessage = 'Rewards claimed';
      const errorMessage = 'Failed to claim rewards';

      return this.txService.handleTx(lockManagerContract.claimRewards(to), successMessage, errorMessage);
    }
  }
}
