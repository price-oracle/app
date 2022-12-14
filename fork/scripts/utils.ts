import { JsonRpcSigner } from '@ethersproject/providers';
import BigNumber from 'bignumber.js';
import hre from 'hardhat';

export type Address = string;

interface UnsignedTx {
  from: Address;
  to: Address;
  value?: BigNumber;
  data?: string;
}

export const advanceTimeAndBlock = async (time: number): Promise<void> => {
  await advanceTime(time);
  await advanceBlock();
};

export const advanceToTimeAndBlock = async (time: number): Promise<void> => {
  await advanceToTime(time);
  await advanceBlock();
};

export const advanceTime = async (time: number): Promise<void> => {
  await hre.network.provider.request({
    method: 'evm_increaseTime',
    params: [time],
  });
};

export const advanceToTime = async (time: number): Promise<void> => {
  await hre.network.provider.request({
    method: 'evm_setNextBlockTimestamp',
    params: [time],
  });
};

export const advanceBlock = async () => {
  await hre.network.provider.request({
    method: 'evm_mine',
    params: [],
  });
};

export const toUnit = (value: number): string => {
  const ONE_UNIT = new BigNumber(10).pow(18);
  return new BigNumber(value).div(ONE_UNIT).toString();
};

export const toWei = (amount: number): BigNumber => {
  const ONE_UNIT = new BigNumber(10).pow(18);
  return new BigNumber(amount).times(ONE_UNIT);
};

export const getBlockTimestamp = async (): Promise<number> => {
  const blockNumber = await hre.ethers.provider.getBlockNumber();
  const timestamp = (await hre.ethers.provider.getBlock(blockNumber)).timestamp;
  return timestamp;
};

export const makeSwap = async (
  tokenIn: string,
  tokenOut: string,
  fee: number,
  amountIn: string,
  wallet: Address,
  uniswapV3Router: any
): Promise<void> => {
  const timestamp = await getBlockTimestamp();

  const swapParams = {
    tokenIn: tokenIn,
    tokenOut: tokenOut,
    fee: fee,
    recipient: wallet,
    deadline: timestamp + 3600,
    amountIn: amountIn,
    amountOutMinimum: 0,
    sqrtPriceLimitX96: 0,
  };

  await sendUnsignedTx({
    from: wallet,
    to: uniswapV3Router.address,
    data: (await uniswapV3Router.populateTransaction.exactInputSingle(swapParams)).data
  });
};

export const impersonate = async (address: string): Promise<JsonRpcSigner> => {
  await hre.network.provider.request({
    method: 'hardhat_impersonateAccount',
    params: [address],
  });
  return hre.ethers.provider.getSigner(address);
};

export const sendUnsignedTx = async ({ from, to, value, data }: UnsignedTx): Promise<any> => {
  if (hre.network.name === 'localhost') await impersonate(from);
  return await hre.network.provider.send(
    'eth_sendTransaction',
    [{
      from,
      to,
      value: value ? '0x' + value.toString(16) : undefined,
      data
    }]
  );
}
