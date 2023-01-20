import { useEffect, useState } from 'react';
import { useNetwork } from 'wagmi';
import styled from 'styled-components';
import { BigNumber } from 'ethers';

import { Address, FeeTier, OraclesCreated, PoolManagerAddresses, Token, UniswapPool } from '~/types';
import { getOracles, getPoolManagerAddresses, getTokenList } from '~/utils';
import { SPACING_24, SPACING_32 } from '~/components/shared';
import { Container } from './SeedLiquidity.styles';
import SelectTokenSection from './SelectToken/SelectTokenSection';
import PropertiesSection from './Properties/PropertiesSection';
import DepositAmountsSection from './Deposit/DepositAmountsSection';
import PoolList from './SeededList/SeededList';
import { getConfig } from '~/config';
import { useAppSelector, useContracts } from '~/hooks';
import { getConstants } from '~/config/constants';

const SeedPage = styled.div`
  background: ${(props) => props.theme.background};
  padding: 0rem 0.8rem ${SPACING_24};
`;

const SeedPageSection = styled.div`
  padding-bottom: ${SPACING_32};
`;

function SeedLiquidity() {
  const poolManagers = useAppSelector((state) => state.poolManagers.elements);
  const { chain } = useNetwork();
  const defaultToken = getTokenList(chain?.id || getConstants().DEFAULT_CHAIN_ID)[0];
  const [selectedToken, setSelectedToken] = useState<Token | undefined>(defaultToken);
  const [startingPrice, setStartingPrice] = useState<BigNumber | undefined>();
  const [uniswapPoolsForFeeTier, setUniswapPoolsForFeeTier] = useState<
    { [feeTier: string]: UniswapPool } | undefined
  >();
  const FEE_TIERS = getConfig().FEE_TIERS;
  const defaultFee = FEE_TIERS[3000];
  const { poolManagerFactoryService, multiCallService } = useContracts();
  const [oraclesCreated, setOraclesCreated] = useState<OraclesCreated>({ defaultFee: false });
  const [pmAddresses, setPMAddresses] = useState<PoolManagerAddresses | undefined>();
  const [poolManagerAddress, setPoolManagerAddress] = useState<Address>('');
  const [selectedFee, setSelectedFee] = useState<FeeTier>(defaultFee);

  useEffect(() => {
    if (poolManagers && selectedToken) {
      getPoolManagerAddresses(poolManagerFactoryService.factoryAddress, selectedToken.address, multiCallService).then(
        (pmAddresses) => {
          setPMAddresses(pmAddresses);
          setOraclesCreated(getOracles(pmAddresses, poolManagers));
          setPoolManagerAddress(pmAddresses[selectedFee.fee]);
        }
      );
    }
  }, [poolManagers, selectedToken]);

  useEffect(() => {
    if (selectedToken?.address && pmAddresses) {
      setPoolManagerAddress(pmAddresses[selectedFee.fee]);
    }
  }, [selectedFee]);

  return (
    <SeedPage>
      <Container>
        <SeedPageSection>
          <SelectTokenSection selectedToken={selectedToken} setSelectedToken={setSelectedToken} />
        </SeedPageSection>
        <SeedPageSection>
          <PropertiesSection
            selectedToken={selectedToken}
            startingPrice={startingPrice}
            setStartingPrice={setStartingPrice}
            uniswapPoolsForFeeTier={uniswapPoolsForFeeTier}
            setUniswapPoolsForFeeTier={setUniswapPoolsForFeeTier}
            selectedFee={selectedFee}
            setSelectedFee={setSelectedFee}
            oraclesCreated={oraclesCreated}
          />
        </SeedPageSection>
        <DepositAmountsSection
          selectedToken={selectedToken}
          startingPrice={startingPrice}
          uniswapPoolsForFeeTier={uniswapPoolsForFeeTier}
          selectedFee={selectedFee}
          poolManagerAddress={poolManagerAddress}
        />
      </Container>
      <PoolList />
    </SeedPage>
  );
}

export default SeedLiquidity;
