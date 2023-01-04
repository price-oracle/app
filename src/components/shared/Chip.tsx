import styled from 'styled-components';

import { SPACING_4 } from './Variables';
import { Typography } from './Typography';

export const Chip = styled(Typography).attrs({
  variant: 'small',
})`
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.textPrimary};
  height: fit-content;
  padding: ${SPACING_4};
  text-align: center;
  width: fit-content;
`;
