import { useEffect, useState } from 'react';
import { BigNumber, utils } from 'ethers';
import { isUndefined } from 'lodash';
import styled from 'styled-components';
import { useAccount } from 'wagmi';

import {
  BoxButton,
  FONT_SIZE_16,
  FONT_SIZE_24,
  Loading,
  PoolIcon,
  SecondaryButton,
  SPACING_16,
  SPACING_24,
  SPACING_8,
  Typography,
} from '~/components/shared';
import InputNumber from '~/components/shared/InputNumber';
import { getConfig } from '~/config';
import { useAppDispatch, useUpdateState, useContracts } from '~/hooks';
import { ModalsActions } from '~/store';
import { PoolManager } from '~/types';
import { getPoolName, humanize, sanitizeDecimals } from '~/utils';

const InputContainer = styled.div`
  display: flex;
  font-size: ${FONT_SIZE_16};
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
  font-size: ${FONT_SIZE_24};
`;

const SBoxButton = styled(BoxButton)`
  margin: 1rem 0;
  padding: 0.6rem 4rem;
  text-align: center;
  width: 100%;
`;

const SInputNumber = styled(InputNumber)`
  border: ${(props) => props.theme.borderPrimary};
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
  font-size: ${FONT_SIZE_16};
`;

const Text = styled(Typography)`
  margin-left: 1.6rem;
`;

const BalanceContainer = styled(Typography)`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin: auto 0;
`;

const Lock = ({ pool }: { pool: PoolManager }) => {
  const { updateLockState } = useUpdateState();
  const dispatch = useAppDispatch();
  const { address } = useAccount();
  const [wethBalance, setWethBalance] = useState<BigNumber>();
  const [wethAllowance, setWethAllowance] = useState<BigNumber>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const wethAmount = InputNumber.useProps();
  const {
    ADDRESSES: { WETH_ADDRESS },
  } = getConfig();
  const { lockManagerService, erc20Service } = useContracts();

  const updateAllowanceAmount = () => {
    if (address) {
      setIsLoading(true);
      erc20Service
        .fetchTokenAllowance([WETH_ADDRESS], pool.lockManagerAddress, address)
        .then(([wethAllowance]) => setWethAllowance(wethAllowance))
        .finally(() => setIsLoading(false));
    }
  };

  useEffect(() => {
    if (!wethBalance && address) {
      erc20Service.fetchTokenBalance([WETH_ADDRESS], address).then(([wethBalance]) => setWethBalance(wethBalance));
    }
  }, [wethBalance]);

  useEffect(() => {
    if (!wethAllowance) {
      updateAllowanceAmount();
    }
  }, [wethAllowance]);

  const setMaxWethAmount = () => wethBalance && wethAmount.set(utils.formatEther(wethBalance));

  const approveWethAmount = () => {
    setIsLoading(true);
    erc20Service
      .approveTokenAmount(WETH_ADDRESS, pool.lockManagerAddress, utils.parseEther(sanitizeDecimals(wethAmount.value)))
      .then(() => updateAllowanceAmount())
      .catch(() => setIsLoading(false));
  };

  const lockWethAmount = () => {
    setIsLoading(true);
    lockManagerService
      .lock(pool.lockManagerAddress, utils.parseEther(sanitizeDecimals(wethAmount.value)))
      .then(() => {
        updateLockState();
        dispatch(ModalsActions.closeModal());
      })
      .catch(() => setIsLoading(false));
  };

  const isApprove = wethAllowance?.lt(utils.parseEther(sanitizeDecimals(wethAmount.value) || '0'));
  const isDisabled = wethAmount.value === '' || utils.parseEther(sanitizeDecimals(wethAmount.value)).isZero();

  return (
    <Container>
      <Title>
        <PoolIcon address={pool.token.address} />
        <Text variant='x-large' weight='bold'>
          Lock in {getPoolName(pool)}
        </Text>
      </Title>

      <Label>
        <BalanceContainer weight='semibold'>
          {'Balance: '}
          {wethBalance ? humanize('amount', wethBalance.toString(), 18, 2) : <Loading />} {'  WETH'}
        </BalanceContainer>
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
          <SBoxButton onClick={approveWethAmount} disabled={isDisabled}>
            Approve
          </SBoxButton>
        ) : (
          <SBoxButton onClick={lockWethAmount} disabled={isDisabled}>
            Lock
          </SBoxButton>
        ))}
    </Container>
  );
};

export default Lock;
