import styled, { css } from 'styled-components';
import { SPACING_24, SPACING_16 } from './Variables';
import Button from './Button';
import { Typography } from './Typography';
import { withComponents } from '~/utils';

const baseStyles = css`
  background-color: ${(props) => props.theme.background};
  border: ${(props) => props.theme.borderPrimary};
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

export default withComponents(Card, {
  Clickable,
});
