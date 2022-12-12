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

export const sendUnsignedTx = async ({ from, to, value, data }: UnsignedTx): Promise<any> => {
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
