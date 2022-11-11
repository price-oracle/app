import styled from 'styled-components';
import { BigNumber } from 'ethers';
// import BigNumber from 'bignumber.js';

import { TokenIcon, Typography, SPACING_8 } from '~/components/shared';
import { getConfig } from '~/config';
// import useHumanizeTokenValue from '../../hooks/useHumanizeTokenValue';

const Container = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-column-gap: ${SPACING_8};
`;

const ValueContainer = styled.div``;

const Suffix = styled(Typography).attrs({
  variant: 'small',
  color: 'disabled',
})`
  margin-left: 2px;
  margin-top: -8px;
`;

const Value = styled(Typography)``;

interface Props {
  value: string | BigNumber;
}

export const PriceLabel = ({ value }: Props) => {
  // const humanized = useHumanizeTokenValue(value);
  const { WETH_ADDRESS } = getConfig().ADDRESSES;
  const humanized = {
    value: 100,
    suffix: 'M',
  };

  return (
    <Container>
      <TokenIcon
        src={`https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${WETH_ADDRESS}/logo.png`}
      />
      <ValueContainer>
        <Value>{humanized.value}</Value>
        <Suffix>{humanized.suffix}</Suffix>
      </ValueContainer>
    </Container>
  );
};

export const TokenLabel = ({ value, address }: { value: string | BigNumber; address: string }) => {
  // const humanized = useHumanizeTokenValue(value);

  const humanized = {
    value: 100,
    suffix: 'M',
  };

  return (
    <Container>
      <TokenIcon
        src={`https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`}
      />
      <ValueContainer>
        <Value>{humanized.value}</Value>
        <Suffix>{humanized.suffix}</Suffix>
      </ValueContainer>
    </Container>
  );
};
