import { useState } from 'react';
import { useNetwork } from 'wagmi';

import { Token } from '~/types/Token';
import { getTokenList } from '~/utils/tokenList';
import DepositAmountsSection from './Deposit/DepositAmountsSection';
import SubmitFormSection from './Deposit/SubmitFormSection';
import PropertiesSection from './Properties/PropertiesSection';
import { Container } from './SeedLiquidity.styles';
import SelectTokenSection from './SelectToken/SelectTokenSection';

function SeedLiquidity() {
  const { chain } = useNetwork();
  const defaultToken = getTokenList(chain?.id)[0];
  const [selectedToken, setSelectedToken] = useState<Token | undefined>(defaultToken);

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
