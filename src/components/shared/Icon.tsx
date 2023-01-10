import styled from 'styled-components';
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
  | 'user'
  | 'help'
  | 'lock'
  | 'gas';

export const Icon = styled.i.attrs<{ name: IconName }>((props) => ({
  className: `picon-${props.name}`,
}))<{
  name: IconName;
  color?: string;
  size?: string;
  padding?: string;
  rotate?: number;
}>`
  color: ${(props) => props.color || props.theme.textPrimary};
  display: inline-block;
  font-size: ${(props) => props.size || FONT_SIZE_18()};
  padding: ${(props) => props.padding || SPACING_4()};
  transform: rotate(${(props) => props.rotate || 0}deg);
`;
