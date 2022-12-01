import { useState } from 'react';
import { useAccount } from 'wagmi';

import {
  SearchInput,
  PoolIcon,
  Loading,
  PrimaryButton,
  Typography,
  TokenLabel,
  EthLabel,
  SortButton,
} from '~/components/shared';
import {
  ButtonContainer,
  Divider,
  LoaderContainer,
  PriceAmountContainer,
  Table,
  Title,
} from '~/pages/Pools/PoolList/PoolList.styles';
import { SCard, Row, Header } from './SeededList.styles';

import { useAppDispatch, useAppSelector } from '~/hooks';
import { getPoolName, formatFee } from '~/utils';
import { PoolManager, Address } from '~/types';
import { PoolManagerService } from '~/services';
import { PoolManagersActions } from '~/store';

const PoolList = () => {
  const { address } = useAccount();
  const [searchInput, setSearchInput] = useState('');
  const poolManagerService = new PoolManagerService();
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
    dispatch(PoolManagersActions.claimRewards({ poolManagerAddress, poolManagerService, userAddress: address }));
  };

  return (
    <SCard>
      <Title>Seeded Pools</Title>

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
            {/* <SortButton text='Seeded' type='seeded' /> */}
            <SortButton text='Claimable rewards' type='claimable' /* pools={pools} onPoolsChanged={setPools} */ />
            <Typography />
          </Header>

          {poolManagerList.map((poolManager) => (
            <Row key={poolManager.address}>
              <Typography>
                <PoolIcon address={poolManager.token.address} />
              </Typography>

              <Typography>{getPoolName(poolManager)}</Typography>
              <Typography>{formatFee(poolManager.fee)}%</Typography>

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
                  value={poolManager.rewards.tokenReward}
                  address={poolManager.token.address}
                  decimals={poolManager.token.decimals}
                />
                <Divider>/</Divider>
                <EthLabel value={poolManager.rewards.ethReward} />
              </PriceAmountContainer>

              <ButtonContainer>
                <PrimaryButton onClick={() => claimRewards(poolManager.address)}>Claim reward</PrimaryButton>
              </ButtonContainer>
            </Row>
          ))}
        </Table>
      )}
    </SCard>
  );
};

export default PoolList;
