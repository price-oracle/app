import hre from 'hardhat';
import { JsonRpcSigner } from '@ethersproject/providers';
import { BigNumber, utils } from 'ethers';

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

export const toUnit = (value: number): BigNumber => {
  return utils.parseUnits(value.toString());
};

export const setBalance = async (
  address: string,
  amount: BigNumber
): Promise<void> => {
  await hre.network.provider.send('hardhat_setBalance', [
    address,
    amount.toHexString(),
  ]);
};
