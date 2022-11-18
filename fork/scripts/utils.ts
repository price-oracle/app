import { JsonRpcSigner } from '@ethersproject/providers';
import BigNumber from 'bignumber.js';
import hre from 'hardhat';

export const impersonate = async (address: string): Promise<JsonRpcSigner> => {
  await hre.network.provider.request({
    method: 'hardhat_impersonateAccount',
    params: [address],
  });
  return hre.ethers.provider.getSigner(address);
};

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

export const setBalance = async (
  address: string,
  amount: BigNumber
): Promise<void> => {
  await hre.network.provider.send('hardhat_setBalance', [
    address,
    '0x'+amount.toString(16),
  ]);
};
