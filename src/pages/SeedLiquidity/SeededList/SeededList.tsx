import { useState } from 'react';
import { BigNumber } from 'ethers';
import { useAccount } from 'wagmi';

import {
  EthLabel,
  Loading,
  PoolIcon,
  PrimaryButton,
  SearchInput,
  SortButton,
  TokenLabel,
  Typography,
} from '~/components/shared';
import { useAppDispatch, useAppSelector, useContracts, useUpdateState } from '~/hooks';
import {
  ButtonContainer,
  Divider,
  LoaderContainer,
  PriceAmountContainer,
  Table,
  Title,
} from '~/pages/Pools/PoolList/PoolList.styles';
import { PoolManagersActions } from '~/store';
import { Address, PoolManager } from '~/types';
import { formatFee, getPoolName, humanize } from '~/utils';
import { Header, Row, SCard } from './SeededList.styles';

const PoolList = () => {
  const { updatePoolState } = useUpdateState();
  const { address } = useAccount();
  const [searchInput, setSearchInput] = useState('');
  const { poolManagerService } = useContracts();
  const dispatch = useAppDispatch();

  const poolManagers = useAppSelector((state) => state.poolManagers.elements);

  const isLoading = !poolManagers;

  const filterPoolManagers = (poolManagers: PoolManager[]): PoolManager[] =>
    poolManagers.filter((poolManager) => {
      const searchCriteria = [poolManager.address, getPoolName(poolManager), poolManager.token.address]
        .join('-')
        .toLowerCase();
      return searchCriteria.includes(searchInput.toLowerCase());
    });

  const poolManagerList = poolManagers ? filterPoolManagers(Object.values(poolManagers)) : [];

  const claimRewards = (poolManagerAddress: Address) => {
    if (!address) return;
    dispatch(
      PoolManagersActions.claimRewards({
        poolManagerAddress,
        poolManagerService,
        userAddress: address,
        updateState: updatePoolState,
      })
    );
  };

  const hasRewardsOnPool = (pool: PoolManager): boolean => {
    if (pool && pool.rewards) {
      return !BigNumber.from(pool.rewards.ethReward).isZero() || !BigNumber.from(pool.rewards.tokenReward).isZero();
    }
    return false;
  };

  const userSeededPools = poolManagerList.filter(
    (pm) => pm.userSeedBalance && !BigNumber.from(pm.userSeedBalance).isZero()
  );

  const getSeededPercentage = (poolManager: PoolManager) => {
    if (poolManager.userSeedBalance) {
      const seededPercentage = BigNumber.from(poolManager.userSeedBalance)
        .mul(10000)
        .div(poolManager.poolLiquidity)
        .toString();
      return humanize('percent', seededPercentage, 0, 2);
    } else {
      return '-';
    }
  };

  return userSeededPools.length > 0 ? (
    <SCard>
      <Title weight='bold'>Seeded Pools</Title>

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
            <SortButton text='Seeded' type='seeded' />
            <SortButton text='Claimable rewards' type='claimable' /* pools={pools} onPoolsChanged={setPools} */ />
            <Typography />
          </Header>

          {userSeededPools.map((poolManager) => (
            <Row key={poolManager.address}>
              <Typography>
                <PoolIcon address={poolManager.token.address} />
              </Typography>

              <Typography>{getPoolName(poolManager)}</Typography>
              <Typography>{formatFee(poolManager.fee)}%</Typography>
              <Typography>{getSeededPercentage(poolManager)}</Typography>

              {/* <PriceAmountContainer>
                <TokenLabel
                  value={'100000000000000000000'}
                  address={poolManager.token.address}
                  decimals={poolManager.token.decimals}
                />
                <Divider>/</Divider>
                <EthLabel value={'100000000000000000000'} />
              </PriceAmountContainer> */}

              <PriceAmountContainer>
                <TokenLabel
                  value={poolManager.rewards?.tokenReward}
                  address={poolManager.token.address}
                  decimals={poolManager.token.decimals}
                />
                <Divider>/</Divider>
                <EthLabel value={poolManager.rewards?.ethReward} />
              </PriceAmountContainer>

              <ButtonContainer>
                <PrimaryButton
                  disabled={!hasRewardsOnPool(poolManager)}
                  onClick={() => claimRewards(poolManager.address)}
                >
                  Claim reward
                </PrimaryButton>
              </ButtonContainer>
            </Row>
          ))}
        </Table>
      )}
    </SCard>
  ) : (
    <></>
  );
};

export default PoolList;
