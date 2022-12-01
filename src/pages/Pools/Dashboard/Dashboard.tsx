import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BigNumber, constants } from 'ethers';

import { Card, Loading, Typography, EthLabel, ValueInUSD, SPACING_1152 } from '~/components/shared';
import { useAppSelector } from '~/hooks';
import { LockManager } from '~/types';
import { UniswapService } from '~/services';
import { getEthPriceInUSDC } from '~/utils';

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
  const [totalLockedInUsd, setTotalLockedInUsd] = useState<BigNumber>(constants.Zero);
  const [totalRewardsInUsd, setTotalRewardsInUsd] = useState<BigNumber>(constants.Zero);

  const lockManagers = useAppSelector((state) => state.lockManagers.elements);
  const isLoading = !lockManagers && totalLockedInUsd.isZero;
  const uniswapService = new UniswapService();

  const getTotalLocked = (lockManagerList: LockManager[]) => {
    let locked = constants.Zero;
    lockManagerList.forEach((lockManager) => {
      locked = locked.add(lockManager.locked);
    });
    return locked;
  };

  const getTotalRewardsInUsd = (lockManagerList: LockManager[]) => {
    let rewardsInUsd = constants.Zero;
    lockManagerList.forEach((lockManager) => {
      rewardsInUsd = rewardsInUsd.add(lockManager.rewards.ethRewardInUsd).add(lockManager.rewards.tokenRewardInUsd);
    });
    return rewardsInUsd;
  };

  const totalUserLocked = lockManagers ? getTotalLocked(Object.values(lockManagers)) : '0';

  useEffect(() => {
    getEthPriceInUSDC(uniswapService).then((ethPriceInWei) => {
      setTotalLockedInUsd(ethPriceInWei.mul(totalUserLocked).div(constants.WeiPerEther));
    });

    if (lockManagers) {
      setTotalRewardsInUsd(getTotalRewardsInUsd(Object.values(lockManagers)));
    }
  }, [lockManagers]);

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
            <EthLabel value={totalUserLocked.toString()} />
            <ValueInUSD value={totalLockedInUsd.toString()} />
          </TokenAmount>
          <TokenAmount>
            {/* <PriceLabel value={totalPriceLocked} /> */}
            <ValueInUSD value={totalRewardsInUsd.toString()} />
          </TokenAmount>
        </>
      )}
    </SCard>
  );
}

export default Dashboard;
