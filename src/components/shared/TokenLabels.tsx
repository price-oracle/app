import styled from 'styled-components';
import { BigNumber } from 'ethers';

import { TokenIcon, Typography, SPACING_8 } from '~/components/shared';
import { getConfig } from '~/config';
import { formatNumber } from '~/utils';

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

export const EthLabel = ({ value }: Props) => {
  const { WETH_ADDRESS } = getConfig().ADDRESSES;

  return <TokenLabel value={value} address={WETH_ADDRESS} decimals={18} />;
};

export const TokenLabel = ({
  value,
  address,
  decimals,
}: {
  value: string | BigNumber;
  address: string;
  decimals: number;
}) => {
  const { number, suffix } = formatNumber(value, decimals);

  return (
    <Container>
      <TokenIcon
        src={`https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`}
      />
      <ValueContainer>
        <Value>{number}</Value>
        <Suffix>{suffix}</Suffix>
      </ValueContainer>
    </Container>
  );
};