import styled from 'styled-components';

import { SPACING_24 } from '~/components/shared';
import { Container } from './SeedLiquidity.styles';
import SelectTokenSection from './SelectToken/SelectTokenSection';
import PropertiesSection from './Properties/PropertiesSection';
import DepositAmountsSection from './Deposit/DepositAmountsSection';
import SubmitFormSection from './Deposit/SubmitFormSection';
import PoolList from './SeededList/SeededList';

const SeedPage = styled.div`
  background: ${(props) => props.theme.background};
  padding-bottom: ${SPACING_24};
`;

function SeedLiquidity() {
  return (
    <SeedPage>
      <Container>
        <SelectTokenSection />
        <PropertiesSection />
        <DepositAmountsSection />
        <SubmitFormSection />
      </Container>

      <PoolList />
    </SeedPage>
  );
}

export default SeedLiquidity;
