import styled from 'styled-components';
import { BigNumber } from 'ethers';

import { Card, Loading, Typography, EthLabel, ValueInUSD, SPACING_1152 } from '~/components/shared';
import { useAppSelector } from '~/hooks';
import { LockManager } from '~/types';

const SCard = styled(Card)`
  grid-template-columns: repeat(2, auto);
  grid-template-rows: repeat(2, auto);
  justify-items: left;
  max-width: ${SPACING_1152};
  margin: 0 auto;
`;

const Title = styled.div`
  grid-column-start: span 2;
`;

const DashboardHeader = styled.div``;

const TokenAmount = styled.div`
  display: flex;
  flex-direction: column;
`;

export function Dashboard() {
  const lockManagers = useAppSelector((state) => state.lockManagers.elements);
  const isLoading = !lockManagers;

  const getTotalLocked = (lockManagerList: LockManager[]) => {
    let locked = BigNumber.from(0);
    lockManagerList.forEach((lockManager) => {
      locked = locked.add(lockManager.locked);
    });
    return locked.toString();
  };

  const totalUserLocked = lockManagers ? getTotalLocked(Object.values(lockManagers)) : '0';

  const ethPrice = '1200'; // TODO: temporary
  const totalUSDClaimableRewards = '10000000000000000000000000000'; // TODO: temporary

  const totalUSDLocked = BigNumber.from(ethPrice).mul(totalUserLocked);

  return (
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

      {isLoading && (
        <>
          <TokenAmount>
            <Loading />
          </TokenAmount>
          <TokenAmount>
            <Loading />
          </TokenAmount>
        </>
      )}

      {!isLoading && (
        <>
          <TokenAmount>
            <EthLabel value={totalUserLocked} />
            <ValueInUSD value={totalUSDLocked} />
          </TokenAmount>
          <TokenAmount>
            {/* <PriceLabel value={totalPriceLocked} /> */}
            <ValueInUSD value={totalUSDClaimableRewards} />
          </TokenAmount>
        </>
      )}
    </SCard>
  );
}

export default Dashboard;
