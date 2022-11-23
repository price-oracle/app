import { abi as IUniswapV3Factory } from '@uniswap/v3-core/artifacts/contracts/UniswapV3Factory.sol/UniswapV3Factory.json';
import { useProvider } from 'wagmi';
import { Contract } from 'ethers-multicall';

import { getConfig } from '~/config';
import { MultiCallService } from './multicallService';
import { Address } from '~/types/Blockchain';

export class UniswapService {
  provider = useProvider();
  addresses = getConfig().ADDRESSES;
  fees = getConfig().FEE_TIERS;
  multiCallService = new MultiCallService();

  async fetchFeeTiers(tokenAddress: Address) {
    const newFees = this.fees;
    const uniswapV3Factory = new Contract(this.addresses.UNISWAP_V3_FACTORY, IUniswapV3Factory);

    const getPoolCall = (feeAmount: number) =>
      uniswapV3Factory.getPool(tokenAddress, this.addresses.WETH_ADDRESS, feeAmount);

    const [fee10000result, fee3000result, fee500result, fee100result] = await this.multiCallService.multicall([
      getPoolCall(10000),
      getPoolCall(3000),
      getPoolCall(500),
      getPoolCall(100),
    ]);

    newFees['1%'].created = fee10000result !== this.addresses.ZERO_ADDRESS;
    newFees['0_3%'].created = fee3000result !== this.addresses.ZERO_ADDRESS;
    newFees['0_05%'].created = fee500result !== this.addresses.ZERO_ADDRESS;
    newFees['0_01%'].created = fee100result !== this.addresses.ZERO_ADDRESS;

    return newFees;
  }
}
