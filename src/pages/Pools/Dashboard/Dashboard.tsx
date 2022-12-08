import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BigNumber, constants } from 'ethers';
import { isUndefined } from 'lodash';

import { Card, Loading, Typography, EthLabel, ValueInUSD, SPACING_1050 } from '~/components/shared';
import { useAppSelector } from '~/hooks';
import { LockManager } from '~/types';

const SCard = styled(Card)`
  grid-template-columns: repeat(2, auto);
  grid-template-rows: repeat(2, auto);
  justify-items: left;
  max-width: ${SPACING_1050};
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
  const { usdPerEth } = useAppSelector((state) => state.prices);
  const isLoading = !lockManagers && totalLockedInUsd.isZero;

  const getTotalLocked = (lockManagerList: LockManager[]) => {
    let locked = constants.Zero;
    lockManagerList.forEach((lockManager) => {
      if (lockManager.locked) {
        locked = locked.add(lockManager.locked);
      }
    });
    return locked;
  };

  const getTotalRewardsInUsd = (lockManagerList: LockManager[]) => {
    let rewardsInEth = constants.Zero;
    lockManagerList.forEach((lockManager) => {
      if (lockManager.rewards) {
        const tokenRewardInEth = constants.WeiPerEther.mul(lockManager.rewards.tokenReward).div(
          lockManager.rewards.tokenPerEth
        );
        rewardsInEth = rewardsInEth.add(lockManager.rewards.ethReward).add(tokenRewardInEth);
      }
    });
    return rewardsInEth.mul(usdPerEth).div(constants.WeiPerEther);
  };

  const hasRewards = lockManagers && Object.values(lockManagers).every((lm) => !isUndefined(lm.rewards));
  const totalUserLocked = hasRewards ? getTotalLocked(Object.values(lockManagers)) : '0';

  useEffect(() => {
    if (lockManagers && usdPerEth && hasRewards) {
      setTotalLockedInUsd(BigNumber.from(usdPerEth).mul(totalUserLocked).div(constants.WeiPerEther));
      setTotalRewardsInUsd(getTotalRewardsInUsd(Object.values(lockManagers)));
    }
  }, [lockManagers, usdPerEth]);

  return (
    <SCard>
      <Title>
        <Typography color='primary'>Dashboard</Typography>
      </Title>
      <DashboardHeader>
        <Typography color='primary'>Total ETH locked</Typography>
      </DashboardHeader>
      <DashboardHeader>
        <Typography color='primary'>Claimable rewards</Typography>
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
            <ValueInUSD color='disabled' value={totalLockedInUsd.toString()} approximate={true} />
          </TokenAmount>
          <TokenAmount>
            {/* <PriceLabel value={totalPriceLocked} /> */}
            <ValueInUSD color='primary' value={totalRewardsInUsd.toString()} approximate={true} />
          </TokenAmount>
        </>
      )}
    </SCard>
  );
}

export default Dashboard;
