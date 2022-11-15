import styled from 'styled-components';

import { Card, Loading, Typography, EthLabel } from '~/components/shared';

const SCard = styled(Card)`
  grid-template-columns: repeat(2, auto);
  grid-template-rows: repeat(2, auto);
  justify-items: left;
  max-width: 72rem;
  margin: 0 auto;
`;

const Title = styled.div`
  grid-column-start: span 2;
`;

const DashboardHeader = styled.div``;

const PriceAmount = styled.div`
  display: flex;
  flex-direction: column;
`;

const PriceUSDTypography = styled(Typography).attrs({
  color: 'disabled',
})`
  margin-left: 5px;
  margin-top: 10px;
`;

const PriceUSD = ({ value }: { value: number }) => {
  const connected = true;

  const priceUsd = connected ? '~ 10 $' : '(0$)';
  return <PriceUSDTypography>{priceUsd}</PriceUSDTypography>;
};

export function Dashboard() {
  // temporary
  const isLoading = false;
  const totalPriceLocked = '10000000000000000000000000';
  const totalUSDLocked = 0;
  const totalUSDClaimableRewards = 0;

  return (
    <>
      <SCard>
        <Title>
          <Typography color='secondary'>Dashboard</Typography>
        </Title>
        <DashboardHeader>
          <Typography color='secondary'>Total ETH locked</Typography>
        </DashboardHeader>
        <DashboardHeader>
          <Typography color='secondary'>Claimable rewards</Typography>
        </DashboardHeader>

        {isLoading ? (
          <>
            <PriceAmount>
              <Loading />
            </PriceAmount>
            <PriceAmount>
              <Loading />
            </PriceAmount>
          </>
        ) : (
          <>
            <PriceAmount>
              <EthLabel value='1234000000000000000000' />
              <PriceUSD value={totalUSDLocked} />
            </PriceAmount>
            <PriceAmount>
              {/* <PriceLabel value={totalPriceLocked} /> */}
              <PriceUSD value={totalUSDClaimableRewards} />
            </PriceAmount>
          </>
        )}
      </SCard>
    </>
  );
}

export default Dashboard;
