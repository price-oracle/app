import { useState } from 'react';

import { Container } from './SeedLiquidity.styles';
import SelectTokenSection from './SelectToken/SelectTokenSection';
import PropertiesSection from './Properties/PropertiesSection';
import DepositAmountsSection from './Deposit/DepositAmountsSection';
import SubmitFormSection from './Deposit/SubmitFormSection';
import { Token } from '~/types/Token';
import { TOKEN_LIST } from '~/utils/tokenList';

function SeedLiquidity() {
  const [selectedToken, setSelectedToken] = useState<Token>(TOKEN_LIST[0]);
  return (
    <Container>
      <SelectTokenSection selectedToken={selectedToken} setSelectedToken={setSelectedToken} />
      <PropertiesSection />
      <DepositAmountsSection selectedToken={selectedToken} />
      <SubmitFormSection />
    </Container>
  );
}

export default SeedLiquidity;
