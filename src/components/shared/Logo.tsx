import styled from 'styled-components';
import LogoSVG from '../../assets/logo-big-light.svg';
import { THEME } from '../../components/shared';

export const Logo = styled.img.attrs({
  src: LogoSVG,
})`
  height: 100%;
  ${THEME.type === 'dark' && 'filter: invert(100%);'}
`;
