import { BigNumber } from 'ethers';
import styled from 'styled-components';

import { Link, SPACING_16 } from '~/components/shared';
import { humanize } from '~/utils';

const SLink = styled(Link)`
  height: ${SPACING_16};
`;

interface IProps {
  totalAmount: BigNumber | string | undefined;
  symbol: string;
  onClick: (totalAmount: string) => void;
  decimals?: number;
}
const Balance = ({ totalAmount, symbol, onClick, decimals = 18 }: IProps) => {
  const humanizedBalance = totalAmount ? humanize('amount', totalAmount.toString(), decimals, 2) : '-';

  return (
    <SLink variant='small' weight='semibold' onClick={() => totalAmount && onClick(totalAmount?.toString())}>
      Balance: {humanizedBalance} {symbol}
    </SLink>
  );
};

export default Balance;
