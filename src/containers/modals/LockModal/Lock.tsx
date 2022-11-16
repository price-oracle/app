import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { isUndefined } from 'lodash';
import { useAccount } from 'wagmi';
import BigNumber from 'bignumber.js';

import { BoxButton, Loading, PoolIcon, SecondaryButton, SPACING_16, SPACING_24, SPACING_8 } from '~/components/shared';
import InputNumber from '~/components/shared/InputNumber';
import { getConfig } from '~/config';
import { useAppDispatch } from '~/hooks';
import { ERC20Service, LockManagerService } from '~/services';
import { ModalsActions } from '~/store';
import { PoolManager } from '~/types/PoolManager';
import { toUnit, toWei } from '~/utils/format';
import { getPoolName } from '~/utils/poolUtils';

const InputContainer = styled.div`
  display: flex;
`;

const Container = styled.div`
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.textPrimary};
  display: grid;
  padding: ${SPACING_16};
`;

const Title = styled.h2`
  align-items: center;
  display: flex;
  justify-content: center;
  margin-top: ${SPACING_24};
  margin-bottom: ${SPACING_24};
`;

const SBoxButton = styled(BoxButton)`
  margin: 10px 0;
  padding: 6px 40px;
  text-align: center;
  width: 100%;
`;

const SInputNumber = styled(InputNumber)`
  border: ${(props) => props.theme.border};
  padding: ${SPACING_8};
  width: 100%;
`;

const Label = styled.label`
  align-items: center;
  display: grid;
  grid-column-gap: ${SPACING_8};
  grid-template-columns: repeat(3, auto);
  margin-bottom: ${SPACING_16};
  width: fit-content;
`;

const Text = styled.div`
  margin-left: 1rem;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  margin: 10px 0;
`;

const Lock = ({ pool }: { pool: PoolManager }) => {
  const dispatch = useAppDispatch();
  const { address } = useAccount();
  const [wethBalance, setWethBalance] = useState<BigNumber>();
  const [wethAllowance, setWethAllowance] = useState<BigNumber>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const wethAmount = InputNumber.useProps();
  const {
    ADDRESSES: { WETH_ADDRESS },
  } = getConfig();
  const erc20Service = new ERC20Service();
  const lockManagerService = new LockManagerService();

  const updateAllowanceAmount = () => {
    if (address) {
      setIsLoading(true);
      erc20Service
        .fetchTokenAllowance(WETH_ADDRESS, pool.lockManagerAddress, address)
        .then((allowance) => setWethAllowance(allowance))
        .finally(() => setIsLoading(false));
    }
  };

  useEffect(() => {
    if (!wethBalance && address) {
      erc20Service.fetchTokenBalance(WETH_ADDRESS, address).then((wethBalance) => setWethBalance(wethBalance));
    }
  }, [wethBalance]);

  useEffect(() => {
    if (!wethAllowance) {
      updateAllowanceAmount();
    }
  }, [wethAllowance]);

  const weiToUnit = (amount: BigNumber) => toUnit(amount.toString());
  const unitToBN = (amount: string) => toWei(amount);

  const setMaxWethAmount = () => wethBalance && wethAmount.set(weiToUnit(wethBalance));
  // const setMaxWethAmount = () => wethBalance && wethAmount.set(weiToUnit(toBN(unitToBN('123.127361293671823687'))));
  const approveWethAmount = () => {
    setIsLoading(true);
    erc20Service
      .approveTokenAmount(WETH_ADDRESS, pool.lockManagerAddress, unitToBN(wethAmount.value))
      .then(() => updateAllowanceAmount())
      .catch(() => setIsLoading(false));
  };

  const lockWethAmount = () => {
    setIsLoading(true);
    lockManagerService
      .lock(pool.lockManagerAddress, unitToBN(wethAmount.value))
      .then(() => dispatch(ModalsActions.closeModal()))
      .catch(() => setIsLoading(false));
  };

  const isApprove = wethAllowance?.lt(unitToBN(wethAmount.value));

  return (
    <Container>
      <Title>
        <PoolIcon address={pool.token.tokenAddress} />
        <Text>Lock in {getPoolName(pool)}</Text>
      </Title>

      <Label>
        Balance: <span>{wethBalance ? weiToUnit(wethBalance) : <Loading />}</span> WETH
      </Label>

      <InputContainer>
        <SInputNumber {...wethAmount} />
        <SecondaryButton onClick={setMaxWethAmount}>Max</SecondaryButton>
      </InputContainer>

      {(isLoading || isUndefined(wethAllowance)) && (
        <SBoxButton disabled={true}>
          <Loading />
        </SBoxButton>
      )}

      {!isLoading &&
        !isUndefined(wethAllowance) &&
        (isApprove ? (
          <SBoxButton onClick={approveWethAmount} disabled={wethAmount.value === '0' || wethAmount.value === ''}>
            Approve
          </SBoxButton>
        ) : (
          <SBoxButton onClick={lockWethAmount} disabled={wethAmount.value === '0' || wethAmount.value === ''}>
            Lock
          </SBoxButton>
        ))}
    </Container>
  );
};

export default Lock;
