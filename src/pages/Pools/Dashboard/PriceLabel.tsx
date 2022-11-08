import styled from 'styled-components';
import { BigNumber } from 'ethers';
// import BigNumber from 'bignumber.js';
import { Typography } from '~/components/shared/Typography';
import { SPACING_8 } from '~/components/shared/Variables';
import PriceIcon from '~/components/shared/PriceIcon';
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

const PriceLabel = ({ value }: Props) => {
  // const humanized = useHumanizeTokenValue(value);

  const humanized = {
    value: 100,
    suffix: 'M',
  };

  return (
    <Container>
      <PriceIcon />
      <ValueContainer>
        <Value>{humanized.value}</Value>
        <Suffix>{humanized.suffix}</Suffix>
      </ValueContainer>
    </Container>
  );
};

export default PriceLabel;
