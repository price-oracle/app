import BigNumber from 'bignumber.js';
import styled from 'styled-components';

import { Link, SPACING_16 } from '~/components/shared';
import { humanize } from '~/utils/format';

const SLink = styled(Link)`
  height: ${SPACING_16};
`;

interface IProps {
  totalAmount: BigNumber;
  symbol: string;
  onClick: (totalAmount: string) => void;
  decimals?: number;
}
const Balance = ({ totalAmount, symbol, onClick, decimals = 18 }: IProps) => {
  return (
    <SLink variant='small' onClick={() => onClick(totalAmount.toString())}>
      Balance: {humanize('amount', totalAmount.toString(), decimals, 2)} {symbol}
    </SLink>
  );
};

export default Balance;
