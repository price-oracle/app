import styled from 'styled-components';
import { PoolManager } from '~/types/PoolManager';
import { TokenIcon } from './TokenIcon';

const BaseTokenIcon = styled(TokenIcon).attrs({
  src: `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png`,
})`
  border-radius: 100%;
  position: absolute;
  bottom: -0.45rem;
  right: -0.45rem;
  height: 1rem;
  width: 1rem;
`;

const IconContainer = styled.div`
  position: relative;
  display: inline-block;
`;

export const PoolIcon = (props: { address: string }) => {
  const src = `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${props.address}/logo.png`;

  return (
    <IconContainer>
      <BaseTokenIcon />
      <TokenIcon src={src} />
    </IconContainer>
  );
};
