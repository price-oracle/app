import styled, { css } from 'styled-components';
import { withProperties } from './utils';
import { THEME_BACKGROUND, THEME_BORDER } from './theme/theme.selector';
import { SPACING_24, SPACING_16 } from './Variables';
import Button from './Button';
import { Typography } from './Typography';

const baseStyles = css`
  background-color: ${THEME_BACKGROUND};
  border: ${THEME_BORDER};
  display: grid;
  grid-row-gap: ${SPACING_16};
  padding: ${SPACING_24};
`;

export const Card = styled(Typography)`
  ${baseStyles}
`;

export const Clickable = styled(Button)`
  ${baseStyles}
`;

export default withProperties(Card, {
  Clickable,
});
