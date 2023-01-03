import { useState } from 'react';
import { BigNumber } from 'ethers';
import { useAccount } from 'wagmi';

import {
  Loading,
  PoolIcon,
  PrimaryButton,
  SearchInput,
  SortButton,
  TokenLabel,
  Typography,
  EthLabel,
} from '~/components/shared';
import { useAppDispatch, useAppSelector, useContracts, useUpdateState } from '~/hooks';
import { LockManagersActions, ModalsActions } from '~/store';
import { Address, PoolManager } from '~/types';
import { formatFee, getPoolName } from '~/utils';
import {
  ButtonContainer,
  Divider,
  Header,
  LoaderContainer,
  PriceAmountContainer,
  Row,
  SCard,
  Table,
  Title,
} from './PoolList.styles';
import { Tooltip } from '~/containers/Tooltips';

const PoolList = () => {
  const { updatePoolAndLockState } = useUpdateState();
  const { address } = useAccount();
  const { lockManagerService } = useContracts();

  const [searchInput, setSearchInput] = useState('');

  const lockManagers = useAppSelector((state) => state.lockManagers.elements);
  const poolManagers = useAppSelector((state) => state.poolManagers.elements);

  const dispatch = useAppDispatch();
  const isLoading = !poolManagers || !lockManagers;

  const openLockModal = (pool: PoolManager) =>
    dispatch(ModalsActions.openModal({ modalName: 'lock', modalProps: pool }));

  const filterPoolManagers = (poolManagers: PoolManager[]): PoolManager[] =>
    poolManagers.filter((poolManager) => {
      const searchCriteria = [poolManager.address, getPoolName(poolManager), poolManager.token.address]
        .join('-')
        .toLowerCase();
      return searchCriteria.includes(searchInput.toLowerCase());
    });

  const poolManagerList = poolManagers ? filterPoolManagers(Object.values(poolManagers)) : [];

  const claimRewards = (lockManagerAddress: Address) => {
    if (!address) return;
    dispatch(
      LockManagersActions.claimRewards({
        lockManagerAddress,
        lockManagerService,
        userAddress: address,
        updateState: updatePoolAndLockState,
      })
    );
  };

  const isClaimable = (poolManager: PoolManager) => {
    if (lockManagers && lockManagers[poolManager.lockManagerAddress].rewards) {
      const tokenRewards = BigNumber.from(lockManagers[poolManager.lockManagerAddress].rewards?.tokenReward);
      const ethRewards = BigNumber.from(lockManagers[poolManager.lockManagerAddress].rewards?.ethReward);
      return tokenRewards.gt(0) || ethRewards.gt(0);
    }
  };

  const lockMessage = () => {
    if (!address) return 'Wallet must be connected';
    return '';
  };

  const claimMesage = (isDisabled: boolean) => {
    if (!address) return 'Wallet must be connected';
    if (isDisabled) return 'Nothing to claim';
    return '';
  };

  return (
    <SCard>
      <Title weight='bold'>Pools</Title>

      <SearchInput onChange={(e) => setSearchInput(e.target.value)} />

      {isLoading && (
        <LoaderContainer>
          <Loading />
        </LoaderContainer>
      )}

      {!isLoading && (
        <Table>
          <Header>
            <Typography />
            <SortButton text='Name' />
            <SortButton text='Fee' />
            <SortButton text='Locked' />
            <SortButton text='Claimable rewards' />
            <Typography />
          </Header>

          {poolManagerList.map((poolManager) => (
            <Row key={poolManager.address}>
              <Typography>
                <PoolIcon address={poolManager.token.address} />
              </Typography>

              <Typography>{getPoolName(poolManager)}</Typography>
              <Typography>{formatFee(poolManager.fee)}%</Typography>

              <PriceAmountContainer>
                <EthLabel value={lockManagers[poolManager.lockManagerAddress].locked} />
              </PriceAmountContainer>

              <PriceAmountContainer>
                <TokenLabel
                  value={lockManagers[poolManager.lockManagerAddress].rewards?.tokenReward}
                  address={poolManager.token.address}
                  decimals={poolManager.token.decimals}
                />
                <Divider>/</Divider>
                <EthLabel value={lockManagers[poolManager.lockManagerAddress].rewards?.ethReward} />
              </PriceAmountContainer>

              <ButtonContainer>
                <Tooltip content={lockMessage()}>
                  <PrimaryButton disabled={!address} onClick={() => openLockModal(poolManager)}>
                    Lock
                  </PrimaryButton>
                </Tooltip>

                <Tooltip content={claimMesage(!isClaimable(poolManager))}>
                  <PrimaryButton
                    disabled={!isClaimable(poolManager)}
                    onClick={() => claimRewards(poolManager.lockManagerAddress)}
                  >
                    Claim
                  </PrimaryButton>
                </Tooltip>
              </ButtonContainer>
            </Row>
          ))}
        </Table>
      )}
    </SCard>
  );
};

export default PoolList;
