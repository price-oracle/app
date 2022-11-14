import { useAppDispatch } from '~/hooks';

import { ModalsActions } from '~/store';

import { SearchInput, PoolIcon, Loading, PrimaryButton, SecondaryButton, Typography } from '~/components/shared';

import { PriceLabel, TokenLabel } from '../Dashboard/PriceLabel';
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

const PoolList = () => {
  const poolManagers = useAppSelector((state) => state.poolManagers.poolManagers);

  const dispatch = useAppDispatch();
  const isLoading = !poolManagers;

  const handleClickLock = () => null;
  const handleClickClaimRewards = () => null;
  const pool = {
    name: 'TUSD-WETH',
    address: '0x0000000000085d4780B73119b644AE5ecd22b376',
    fee: '2',
    locked: 'test',
    claimable: 'test',
  };

  const testModal = () =>
    dispatch(ModalsActions.openModal({ modalName: 'test', modalProps: { testVar: 'Test var text' } }));

  const poolManagerList = poolManagers ? Object.values(poolManagers) : [];

  return (
    <>
      <SCard>
        <Title>Pools</Title>
        <PrimaryButton onClick={testModal}>Test modal</PrimaryButton>

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
                  <PoolIcon pool={poolManager} />
                </Typography>
                <Typography>{poolManager.token.tokenSymbol}-WETH</Typography>
                <Typography>{Number(poolManager.fee) / 1000}%</Typography>
                <PriceAmountContainer>
                  <PriceLabel value={pool.locked!} />
                </PriceAmountContainer>
                <PriceAmountContainer>
                  <PriceLabel value={pool.claimable!} />
                  <Divider>/</Divider>
                  <TokenLabel value={pool.claimable!} address={pool.address} />
                </PriceAmountContainer>
                <ButtonContainer>
                  <PrimaryButton onClick={() => handleClickLock()}>Lock</PrimaryButton>
                  <SecondaryButton onClick={() => handleClickClaimRewards()}>Claim rewards</SecondaryButton>
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
