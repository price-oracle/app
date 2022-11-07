import styled from 'styled-components';
import LogoSVG from '~/assets/logo-big-light.svg';
import { PropTheme } from '~/components/shared';

export const Logo = styled.img.attrs({
  src: LogoSVG,
})<PropTheme>`
  height: 100%;
  ${(props) => props.theme.type === 'dark' && 'filter: invert(100%);'}
`;
