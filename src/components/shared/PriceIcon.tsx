import TokenIcon from './TokenIcon';
import styled from 'styled-components';
import Logo from '../../assets/logo.svg';

const PriceIcon = styled(TokenIcon).attrs({
  src: Logo,
})`
  background-color: ${(props) => props.theme.background};
  background-size: 10px;
  border: ${(props) => props.theme.border};
  box-sizing: border-box;
`;

export default PriceIcon;
