import { useState } from 'react';
import { useAppSelector } from '~/hooks';

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

import { getPoolName, formatFee } from '~/utils';
import { PoolManager } from '~/types/PoolManager';

const PoolList = () => {
  const [searchInput, setSearchInput] = useState('');

  const poolManagers = useAppSelector((state) => state.poolManagers.elements);

  const isLoading = !poolManagers;

  const filterPoolManagers = (poolManagers: PoolManager[]): PoolManager[] =>
    poolManagers.filter((poolManager) => {
      const searchCriteria = [poolManager.address, getPoolName(poolManager), poolManager.token.tokenAddress]
        .join('-')
        .toLowerCase();
      return searchCriteria.includes(searchInput.toLowerCase());
    });

  const poolManagerList = poolManagers ? filterPoolManagers(Object.values(poolManagers)) : [];

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
            <SortButton text='Seeded' type='seeded' /* pools={pools} onPoolsChanged={setPools} */ />
            <SortButton text='Claimable rewards' type='claimable' /* pools={pools} onPoolsChanged={setPools} */ />
            <Typography />
          </Header>

          {poolManagerList.map((poolManager) => (
            <Row key={poolManager.address}>
              <Typography>
                <PoolIcon address={poolManager.token.tokenAddress} />
              </Typography>

              <Typography>{getPoolName(poolManager)}</Typography>
              <Typography>{formatFee(poolManager.fee)}%</Typography>

              <PriceAmountContainer>
                <EthLabel value={'100000000000000000000'} />
                <Divider>/</Divider>
                <TokenLabel value={'100000000000000000000'} address={poolManager.token.tokenAddress} decimals={18} />
              </PriceAmountContainer>

              <PriceAmountContainer>
                <EthLabel value={poolManager.rewards.ethReward} />
                <Divider>/</Divider>
                <TokenLabel
                  value={poolManager.rewards.tokenReward}
                  address={poolManager.token.tokenAddress}
                  decimals={18}
                />
              </PriceAmountContainer>

              <ButtonContainer>
                <PrimaryButton onClick={() => console.log('handleButton')}>Claim reward</PrimaryButton>
              </ButtonContainer>
            </Row>
          ))}
        </Table>
      )}
    </SCard>
  );
};

export default PoolList;
