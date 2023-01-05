import styled from 'styled-components';

import {
  Typography,
  Chip,
  TokenIcon,
  FONT_SIZE_20,
  SPACING_32,
  SPACING_16,
  MOBILE_MAX_WIDTH,
  SPACING_28,
  Icon,
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
  height: ${SPACING_28};
`;

const Helper = styled(Icon)`
  grid-area: helper;
  justify-self: end;
  cursor: pointer;
  padding: 0;
`;

export const LockIcon = styled(Icon).attrs({
  name: 'lock',
})`
  padding: 0;
  margin-left: 0.8rem;
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
