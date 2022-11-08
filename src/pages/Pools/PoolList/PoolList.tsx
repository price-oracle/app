import {
  ButtonContainer,
  SCard,
  Row,
  Table,
  Title,
  Header,
  LoaderContainer,
  PriceAmountContainer,
  Divider,
} from './PoolList.styles';
import { Typography } from '~/components/shared';
import { PrimaryButton, SecondaryButton } from '~/components/shared';
import SearchInput from '~/components/shared/SearchInput';
import { PriceLabel, TokenLabel } from '../Dashboard/PriceLabel';
import SortButton from './SortButton';
import PoolIcon from '~/components/shared/PoolIcon';
import Loading from '~/components/shared/Loading';

const PoolList = () => {
  // temporary
  const isLoading = false;
  const handleClickLock = () => null;
  const handleClickClaimRewards = () => null;

  const pool = {
    name: 'TUSD-WETH',
    apy: '11',
    address: '0x0000000000085d4780B73119b644AE5ecd22b376',
    fee: '2',
    locked: 'test',
    claimable: 'test',
  };
  const pools = [pool, pool];

  const WETH_ADDRESS = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2';
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
              <SortButton text='APY' type='apy' /* pools={pools} onPoolsChanged={setPools} */ />
              <SortButton text='Fee' type='fee' /* pools={pools} onPoolsChanged={setPools} */ />
              <SortButton text='Locked' type='locked' /* pools={pools} onPoolsChanged={setPools} */ />
              <SortButton text='Claimable rewards' type='claimable' /* pools={pools} onPoolsChanged={setPools} */ />
              <Typography />
            </Header>

            {pools.map((p) => (
              <Row key={p.address}>
                <Typography>
                  <PoolIcon pool={p} />
                </Typography>
                <Typography>{p.name}</Typography>
                <Typography>{p.apy}%</Typography>
                <Typography>{p.fee}%</Typography>
                <PriceAmountContainer>
                  <PriceLabel value={p.locked!} />
                </PriceAmountContainer>
                <PriceAmountContainer>
                  <PriceLabel value={p.claimable!} />
                  <Divider>/</Divider>
                  <TokenLabel value={p.claimable!} address={pool.address} />
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
