import styled from 'styled-components';
import { THEME_TEXT_PRIMARY } from './theme/theme.selector';
import { FONT_SIZE_18, SPACING_4 } from './Variables';

export type IconName =
  | 'arrow-down'
  | 'arrow-up-right'
  | 'chevron-down'
  | 'close'
  | 'ethereum'
  | 'fantom'
  | 'github'
  | 'loader'
  | 'moon'
  | 'optimism'
  | 'search'
  | 'send'
  | 'sun'
  | 'twitter'
  | 'user';

export const Icon = styled.i.attrs<{ name: IconName }>((props) => ({
  className: `picon-${props.name}`,
}))<{
  name: IconName;
  color?: string;
  size?: string;
  padding?: string;
  rotate?: number;
}>`
  color: ${(props) => props.color || THEME_TEXT_PRIMARY(props)};
  display: inline-block;
  font-size: ${(props) => props.size || FONT_SIZE_18()};
  padding: ${(props) => props.padding || SPACING_4()};
  transform: rotate(${(props) => props.rotate || 0}deg);
`;
