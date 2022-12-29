import styled from 'styled-components';

import {
  TokenIcon,
  EthIcon,
  Typography,
  InputNumber,
  FONT_SIZE_20,
  FONT_SIZE_24,
  SPACING_16,
  SPACING_24,
  SPACING_8,
} from '~/components/shared';
import { withComponents } from '~/utils';

const Container = styled.section`
  align-items: center;
  border: ${(props) => props.theme.borderPrimary};
  display: grid;
  grid-template-areas: 'token amount symbol';
  padding: ${SPACING_24} ${SPACING_16};
`;

interface ComponentProps {
  children: any;
}
const Deposit = ({ children }: ComponentProps) => {
  return <Container>{children}</Container>;
};

const STokenIcon = styled(TokenIcon).attrs({
  size: FONT_SIZE_24(),
})`
  grid-area: token;
`;

interface TokenProps {
  className?: string;
  src?: string;
  isPrice?: boolean;
}
const Token = ({ className, isPrice, src }: TokenProps) => {
  return isPrice ? <EthIcon /> : <STokenIcon className={className} src={src || ''} />;
};

const Amount = styled(InputNumber)`
  font-size: ${FONT_SIZE_20};
  line-height: 1.25em;
  grid-area: amount;
  width: 100%;
  padding: 0 ${SPACING_8};
`;

const Symbol = styled(Typography)`
  grid-area: symbol;
`;

export default withComponents(Deposit, {
  Token,
  Amount,
  Symbol,
});
