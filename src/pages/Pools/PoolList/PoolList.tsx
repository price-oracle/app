import { useState } from 'react';
import { BigNumber } from 'ethers';
import { useAccount } from 'wagmi';

import {
  Loading,
  PoolIcon,
  PrimaryButton,
  SearchInput,
  SecondaryButton,
  SortButton,
  TokenLabel,
  Typography,
} from '~/components/shared';
import { EthLabel } from '~/components/shared/TokenLabels';
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

const PoolList = () => {
  const { updateLockState } = useUpdateState();
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
        updateState: updateLockState,
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
            <SortButton text='Name' type='name' /* pools={pools} onPoolsChanged={setPools} */ />
            <SortButton text='Fee' type='fee' /* pools={pools} onPoolsChanged={setPools} */ />
            <SortButton text='Locked' type='locked' /* pools={pools} onPoolsChanged={setPools} */ />
            <SortButton text='Claimable rewards' type='claimable' /* pools={pools} onPoolsChanged={setPools} */ />
            <Typography />
          </Header>

          {/* TODO: We should filter poolManagerList and only show the ones that the account has value locked */}
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
                <PrimaryButton disabled={!address} onClick={() => openLockModal(poolManager)}>
                  Lock
                </PrimaryButton>
                <SecondaryButton
                  disabled={!isClaimable(poolManager)}
                  onClick={() => claimRewards(poolManager.lockManagerAddress)}
                >
                  Claim
                </SecondaryButton>
              </ButtonContainer>
            </Row>
          ))}
        </Table>
      )}
    </SCard>
  );
};

export default PoolList;
