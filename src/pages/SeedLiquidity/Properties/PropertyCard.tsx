import styled from 'styled-components';

import help from '~/assets/help.svg';
import {
  Typography,
  Chip,
  TokenIcon,
  FONT_SIZE_20,
  SPACING_32,
  SPACING_16,
  MOBILE_MAX_WIDTH,
} from '~/components/shared';
import { withComponents } from '~/utils';

const PropertyCard = styled.section`
  border-bottom: ${(props) => props.theme.borderPrimary};
  border-top: ${(props) => props.theme.borderPrimary};
  padding: ${SPACING_16} 0;
  display: grid;

  grid-template-areas:
    'title helper'
    'value chip';

  grid-row-gap: ${SPACING_32};
  align-self: start;
  justify-content: space-between;
  align-items: center;

  @media (max-width: ${MOBILE_MAX_WIDTH}px) {
    width: 100%;
  }
`;

const Title = styled(Typography)`
  grid-area: title;
  text-align: start;
`;

const Value = styled(Typography).attrs({
  variant: 'large',
})`
  display: flex;
  font-size: ${FONT_SIZE_20};
  font-weight: 700;
  grid-area: value;
  line-height: 1.25;
  max-width: 30rem;
`;

const Helper = styled(TokenIcon).attrs({
  // temporary icon
  src: help,
})`
  ${(props) => props.theme.type === 'dark' && 'filter: invert(100%);'}
  grid-area: helper;
  justify-self: end;
  cursor: pointer;
`;

const SChip = styled(Chip)`
  grid-area: chip;
`;

export default withComponents(PropertyCard, {
  Title,
  Value,
  Helper,
  Chip: SChip,
});
