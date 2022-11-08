import TokenIcon from './TokenIcon';
import { THEME_BACKGROUND, THEME_BORDER } from './theme/theme.selector';
import styled from 'styled-components';
import Logo from '../../assets/logo.svg';

const PriceIcon = styled(TokenIcon).attrs({
  src: Logo,
})`
  background-color: ${THEME_BACKGROUND};
  background-size: 10px;
  border: ${THEME_BORDER};
  box-sizing: border-box;
`;

export default PriceIcon;
