import { useState } from 'react';
import { useNetwork } from 'wagmi';
import styled from 'styled-components';
import { BigNumber } from 'ethers';

import { FeeTier, Token, UniswapPool } from '~/types';
import { getTokenList } from '~/utils';
import { SPACING_24 } from '~/components/shared';
import { Container } from './SeedLiquidity.styles';
import SelectTokenSection from './SelectToken/SelectTokenSection';
import PropertiesSection from './Properties/PropertiesSection';
import DepositAmountsSection from './Deposit/DepositAmountsSection';
import PoolList from './SeededList/SeededList';
import { getConfig } from '~/config';

const SeedPage = styled.div`
  background: ${(props) => props.theme.background};
  padding: 0rem 0.8rem ${SPACING_24};
`;

function SeedLiquidity() {
  const { chain, chains } = useNetwork();
  const defaultToken = getTokenList(chain?.id || chains[0].id)[0];
  const [selectedToken, setSelectedToken] = useState<Token | undefined>(defaultToken);
  const [startingPrice, setStartingPrice] = useState<BigNumber>(BigNumber.from('100'));
  const [uniswapPoolsForFeeTier, setUniswapPoolsForFeeTier] = useState<
    { [feeTier: string]: UniswapPool } | undefined
  >();

  const FEE_TIERS = getConfig().FEE_TIERS;

  const defaultFee = FEE_TIERS[3000];
  const [selectedFee, setSelectedFee] = useState<FeeTier>(defaultFee);

  return (
    <SeedPage>
      <Container>
        <SelectTokenSection selectedToken={selectedToken} setSelectedToken={setSelectedToken} />
        <PropertiesSection
          selectedToken={selectedToken}
          startingPrice={startingPrice}
          setStartingPrice={setStartingPrice}
          uniswapPoolsForFeeTier={uniswapPoolsForFeeTier}
          setUniswapPoolsForFeeTier={setUniswapPoolsForFeeTier}
          selectedFee={selectedFee}
          setSelectedFee={setSelectedFee}
        />
        <DepositAmountsSection
          selectedToken={selectedToken}
          startingPrice={startingPrice}
          uniswapPoolsForFeeTier={uniswapPoolsForFeeTier}
          selectedFee={selectedFee}
        />
      </Container>
      <PoolList />
    </SeedPage>
  );
}

export default SeedLiquidity;
