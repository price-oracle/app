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

export const ValueInUSD = ({ value, approximate }: { value: string | BigNumber; approximate?: boolean }) => {
  const { number, suffix } = formatNumber(value.toString());

  return (
    <TokenUSDypography>
      {approximate && '~'} $ {number}
      <Suffix>{suffix}</Suffix>
    </TokenUSDypography>
  );
};
