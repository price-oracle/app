import styled from 'styled-components';
import { TokenIcon } from './TokenIcon';
import { SPACING_16 } from './Variables';

const BaseTokenIcon = styled(TokenIcon).attrs({
  src: `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png`,
})`
  border-radius: 100%;
  position: absolute;
  bottom: -0.72rem;
  right: -0.72rem;
  height: ${SPACING_16};
  width: ${SPACING_16};
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
