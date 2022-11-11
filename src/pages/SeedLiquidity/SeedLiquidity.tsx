import { Container } from './SeedLiquidity.styles';

import SelectTokenSection from './SelectToken/SelectTokenSection';
import PropertiesSection from './Properties/PropertiesSection';
import DepositAmountsSection from './Deposit/DepositAmountsSection';
import SubmitFormSection from './Deposit/SubmitFormSection';

function SeedLiquidity() {
  return (
    <Container>
      <SelectTokenSection />
      <PropertiesSection />
      <DepositAmountsSection />
      <SubmitFormSection />
    </Container>
  );
}

export default SeedLiquidity;
