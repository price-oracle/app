import { TokenIcon } from './TokenIcon';
import styled from 'styled-components';
import Logo from '../../assets/logo.svg';

export const PriceIcon = styled(TokenIcon).attrs({
  src: Logo,
})`
  background-color: ${(props) => props.theme.background};
  background-size: 10px;
  border: ${(props) => props.theme.borderPrimary};
  box-sizing: border-box;
`;
