import { abi as IPoolManagerFactoryABI } from '@price-oracle/interfaces/abi/IPoolManagerFactory.json';
import { Provider } from '@wagmi/core';
import { BigNumber, ethers, Signer, utils } from 'ethers';

import { getConfig } from '~/config';
import { TxService } from '~/services';
import { Address, PoolAndLockManager } from '~/types';
import { getPriceForToken } from '~/utils';
import { bytecode } from '~solidity/artifacts/contracts/BatchPoolManagerData.sol/BatchPoolManagerData.json';

export class PoolManagerFactoryService {
  provider: Provider;
  signer: Signer | undefined;
  factoryAddress = getConfig().ADDRESSES.deployed.POOL_MANAGER_FACTORY;
  zeroAddress = getConfig().ADDRESSES.ZERO_ADDRESS;
  txService: TxService;

  constructor(txService: TxService, provider: Provider, signer: Signer | undefined) {
    this.provider = provider;
    this.txService = txService;
    this.signer = signer;
  }

  async getPoolManagerAddress(tokenAddress: Address, feeAmount: number): Promise<Address> {
    const factory = new ethers.Contract(this.factoryAddress, IPoolManagerFactoryABI, this.provider);
    return await factory.callStatic.getPoolManagerAddress(tokenAddress, feeAmount);
  }

  async createPoolManager(
    erc20Address: Address,
    erc20Symbol: string,
    fee: number,
    liquidity: BigNumber,
    sqrtPriceX96: BigNumber
  ) {
    if (this.signer) {
      const factory = new ethers.Contract(this.factoryAddress, IPoolManagerFactoryABI, this.signer);
      const createPoolManagerTx = factory.createPoolManager(erc20Address, fee, liquidity, sqrtPriceX96);

      const successMessage = `Succesfully created ${erc20Symbol} oracle`;
      const errorMessage = `Failed to create ${erc20Symbol} oracle`;

      return this.txService.handleTx(createPoolManagerTx, successMessage, errorMessage);
    }
  }

  async estimateGasCreatePoolManager(
    erc20Address: Address,
    fee: number,
    liquidity: BigNumber,
    sqrtPriceX96: BigNumber
  ) {
    if (this.signer) {
      const factory = new ethers.Contract(this.factoryAddress, IPoolManagerFactoryABI, this.signer);
      const createPoolManagerTx = factory.estimateGas.createPoolManager(erc20Address, fee, liquidity, sqrtPriceX96);

      return createPoolManagerTx;
    }
  }

  async getMinEthAmount(): Promise<BigNumber> {
    const factory = new ethers.Contract(this.factoryAddress, IPoolManagerFactoryABI, this.provider);
    return await factory.minEthAmount();
  }

  async fetchPoolAndLockManagers(userAddress: Address | undefined): Promise<PoolAndLockManager[]> {
    const factory = new ethers.Contract(this.factoryAddress, IPoolManagerFactoryABI, this.provider);

    //TODO: This supports up to 34 pools. Should be paginated if more.
    const pmCount = await factory.callStatic.childrenCount();

    // Encoded input data to be sent to the batch contract constructor
    const inputData = utils.defaultAbiCoder.encode(
      ['address', 'uint256', 'uint256', 'address'],
      [this.factoryAddress, 0, pmCount, userAddress || this.zeroAddress]
    );

    // Generate payload from input data
    const payload = bytecode.concat(inputData.slice(2));

    // Call the deployment transaction with the payload
    const returnedData = await this.provider.call({ data: payload });

    // Parse the returned value to the struct type in order
    const [decoded] = ethers.utils.defaultAbiCoder.decode(
      [
        'tuple(address,uint24,bool,uint256,uint256,uint256,uint256,address,address,uint256,uint256,uint256,uint160,address,string,string,uint256)[]',
      ],
      returnedData
    );

    // Parse the data to a js object
    const parsedData = decoded.map((elem: any) => this.parsePoolAndLockManager(elem, userAddress));

    return parsedData;
  }

  parsePoolAndLockManager(element: any, userAddress: Address | undefined): PoolAndLockManager {
    const isWethToken0 = element[2];
    const token = element[13];
    return {
      poolManagerAddress: element[0],
      fee: element[1],
      isWethToken0,
      poolManagerRewards: userAddress
        ? {
            ethReward: element[3].toString(),
            tokenReward: element[4].toString(),
          }
        : undefined,
      poolLiquidity: element[5].toString(),
      userSeedBalance: userAddress && element[6].toString(),
      lockManagerAddress: element[7],
      pool: element[8],
      lockManagerRewards: userAddress
        ? {
            ethReward: element[9].toString(),
            tokenReward: element[10].toString(),
          }
        : undefined,
      locked: userAddress && element[11].toString(),
      tokenPerEth: getPriceForToken(element[12], isWethToken0).toString(),
      token: {
        address: token,
        symbol: element[14],
        name: element[15],
        decimals: element[16].toString(),
        logoURI: `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${ethers.utils.getAddress(
          token
        )}/logo.png`,
      },
    };
  }
}
