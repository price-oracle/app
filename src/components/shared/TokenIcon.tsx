import styled from 'styled-components';
import { FONT_SIZE_20 } from './Variables';

export const TokenIcon = styled.div<{ src: string; size?: string }>`
  background-color: #f2f4f7;
  background-image: url(${(props) => props.src});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: ${(props) => props.size || FONT_SIZE_20()};
  width: ${(props) => props.size || FONT_SIZE_20()};
  border-radius: 24px;
`;
