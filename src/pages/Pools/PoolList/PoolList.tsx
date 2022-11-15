import { useAppDispatch } from '~/hooks';

import { ModalsActions } from '~/store';

import {
  SearchInput,
  PoolIcon,
  Loading,
  PrimaryButton,
  SecondaryButton,
  Typography,
  TokenLabel,
  EthLabel,
} from '~/components/shared';
import SortButton from './SortButton';

import { useAppSelector } from '~/hooks';
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
import { PoolManager } from '~/types/PoolManager';
import { getConfig } from '~/config';

const PoolList = () => {
  const poolManagers = useAppSelector((state) => state.poolManagers.poolManagers);

  const dispatch = useAppDispatch();
  const isLoading = !poolManagers;

  const openLockModal = (pool: PoolManager) =>
    dispatch(ModalsActions.openModal({ modalName: 'lock', modalProps: pool }));

  const poolManagerList = poolManagers ? Object.values(poolManagers) : [];

  return (
    <>
      <SCard>
        <Title>Pools</Title>

        <SearchInput onChange={(e) => console.log(e.target.value)} />

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

            {poolManagerList.map((poolManager) => (
              <Row key={poolManager.address}>
                <Typography>
                  <PoolIcon address={poolManager.token.tokenAddress} />
                </Typography>
                <Typography>{poolManager.token.tokenSymbol}-WETH</Typography>
                <Typography>{Number(poolManager.fee) / 1000}%</Typography>
                <PriceAmountContainer>
                  <EthLabel value='1234000000000000000000' />
                </PriceAmountContainer>
                <PriceAmountContainer>
                  <EthLabel value='1234000000000000000000' />
                  <Divider>/</Divider>
                  <TokenLabel value='1234000000000000000000' address={poolManager.token.tokenAddress} decimals={18} />
                </PriceAmountContainer>
                <ButtonContainer>
                  <PrimaryButton onClick={() => openLockModal(poolManager)}>Lock</PrimaryButton>
                  <SecondaryButton onClick={() => console.log('handleClickClaimRewards()')}>
                    Claim rewards
                  </SecondaryButton>
                </ButtonContainer>
              </Row>
            ))}
          </Table>
        )}
      </SCard>
    </>
  );
};

export default PoolList;
