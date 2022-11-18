import styled from 'styled-components';
import { BigNumberish } from 'ethers';

import { Typography, Suffix } from '~/components/shared';
import { formatNumber } from '~/utils';

const TokenUSDypography = styled(Typography).attrs({
  color: 'disabled',
})`
  margin-left: 5px;
  margin-top: 10px;
`;

export const ValueInUSD = ({ value }: { value: string | BigNumberish }) => {
  const { number, suffix } = formatNumber(value.toString());

  return (
    <TokenUSDypography>
      $ {number}
      <Suffix>{suffix}</Suffix>
    </TokenUSDypography>
  );
};
