import styled from 'styled-components';
import { BigNumber } from 'ethers';

import { Typography, Suffix } from '~/components/shared';
import { formatNumber } from '~/utils';

const TokenUSDypography = styled(Typography).attrs({
  color: 'disabled',
})`
  margin-left: 5px;
  margin-top: 10px;
`;

export const Value = styled(Typography)``;

export const ValueInUSD = ({
  value,
  approximate,
  color,
}: {
  value: string | BigNumber;
  approximate?: boolean;
  color?: 'primary' | 'secondary' | 'disabled' | 'background' | undefined;
}) => {
  const { number, suffix } = formatNumber(value.toString());

  return (
    <TokenUSDypography>
      <Value color={color}>
        {approximate && '~'} $ {number}
      </Value>
      <Suffix color={color}>{suffix}</Suffix>
    </TokenUSDypography>
  );
};
