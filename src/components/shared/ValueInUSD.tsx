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
  value: string | BigNumber | undefined;
  approximate?: boolean;
  color?: 'primary' | 'secondary' | 'disabled' | 'background' | undefined;
}) => {
  let number: string | number = '-';
  let suffix = '';
  if (value) {
    ({ number, suffix } = formatNumber(value.toString()));

    if (!BigNumber.from(value).isZero() && number == 0) {
      number = '< 0.01';
    }
  }

  return (
    <TokenUSDypography>
      <Value color={color}>
        {approximate && value && '~'} $ {number}
      </Value>
      <Suffix color={color}>{suffix}</Suffix>
    </TokenUSDypography>
  );
};
