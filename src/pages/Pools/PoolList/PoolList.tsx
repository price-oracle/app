import { useState } from 'react';
import { useAccount } from 'wagmi';

import { useAppDispatch, useAppSelector } from '~/hooks';
import { LockManagersActions, ModalsActions } from '~/store';
import {
  Loading,
  PoolIcon,
  PrimaryButton,
  SearchInput,
  SecondaryButton,
  TokenLabel,
  SortButton,
  Typography,
} from '~/components/shared';
import { EthLabel } from '~/components/shared/TokenLabels';
import { PoolManager, Address } from '~/types';
import { getPoolName, formatFee } from '~/utils';
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
import { LockManagerService } from '~/services';

const PoolList = () => {
  const { address } = useAccount();
  const lockManagerService = new LockManagerService();

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
    dispatch(LockManagersActions.claimRewards({ lockManagerAddress, lockManagerService, userAddress: address }));
  };

  return (
    <SCard>
      <Title>Pools</Title>

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
                <EthLabel value={lockManagers[poolManager.lockManagerAddress].rewards.ethReward} />
                <Divider>/</Divider>
                <TokenLabel
                  value={lockManagers[poolManager.lockManagerAddress].rewards.tokenReward}
                  address={poolManager.token.address}
                  decimals={poolManager.token.decimals}
                />
              </PriceAmountContainer>

              <ButtonContainer>
                <PrimaryButton onClick={() => openLockModal(poolManager)}>Lock</PrimaryButton>
                <SecondaryButton onClick={() => claimRewards(poolManager.lockManagerAddress)}>
                  Claim rewards
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
