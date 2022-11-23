import { useState } from 'react';
import { useNetwork } from 'wagmi';
import styled from 'styled-components';

import { Token } from '~/types';
import { getTokenList } from '~/utils/tokenList';
import { SPACING_24 } from '~/components/shared';
import { Container } from './SeedLiquidity.styles';
import SelectTokenSection from './SelectToken/SelectTokenSection';
import PropertiesSection from './Properties/PropertiesSection';
import DepositAmountsSection from './Deposit/DepositAmountsSection';
import SubmitFormSection from './Deposit/SubmitFormSection';
import PoolList from './SeededList/SeededList';

const SeedPage = styled.div`
  background: ${(props) => props.theme.background};
  padding: 0rem 0.8rem ${SPACING_24};
`;

function SeedLiquidity() {
  const { chain } = useNetwork();
  const defaultToken = getTokenList(chain?.id)[0];
  const [selectedToken, setSelectedToken] = useState<Token | undefined>(defaultToken);

  return (
    <SeedPage>
      <Container>
        <SelectTokenSection selectedToken={selectedToken} setSelectedToken={setSelectedToken} />
        <PropertiesSection />
        <DepositAmountsSection selectedToken={selectedToken} />
        <SubmitFormSection />
      </Container>
      <PoolList />
    </SeedPage>
  );
}

export default SeedLiquidity;
