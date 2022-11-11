import styled from 'styled-components';

import { Link, SPACING_16 } from '~/components/shared';

const SLink = styled(Link)`
  height: ${SPACING_16};
`;

interface IProps {
  totalAmount: string;
  symbol: string;
  onClick: (totalAmount: string) => void;
  decimals?: number;
}
const Balance = ({ totalAmount, symbol, onClick, decimals }: IProps) => {
  const humanized = {
    value: totalAmount,
    suffix: 'M',
    decimals,
  };

  return (
    <SLink variant='small' onClick={() => console.log('handleClick')}>
      Balance: {humanized.value} {humanized.suffix} {symbol}
    </SLink>
  );
};

export default Balance;
