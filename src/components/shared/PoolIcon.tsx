import styled from 'styled-components';
import { PoolManager } from '~/types/PoolManager';
import Logo from '~/assets/logo.svg';
import { TokenIcon } from './TokenIcon';

const PriceIcon = styled(TokenIcon).attrs({
  src: Logo,
})`
  border-radius: unset;
  bottom: -3px;
  height: 10px;
  position: absolute;
  right: -3px;
  width: 10px;
`;

const IconContainer = styled.div`
  position: relative;
  display: inline-block;
`;

// temporary
interface Props {
  name: string;
  apy: string;
  address: string;
  fee: string;
  locked: string;
  claimable: string;
}

export const PoolIcon = ({ pool }: { pool: PoolManager }) => {
  const src = `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${pool.token.tokenAddress}/logo.png`;
  return (
    <IconContainer>
      <PriceIcon />
      <TokenIcon src={src} />
    </IconContainer>
  );
};
