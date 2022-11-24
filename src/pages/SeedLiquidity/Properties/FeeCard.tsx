import styled from 'styled-components';

import Card from '~/components/shared/Card';
import { Chip, Typography, MOBILE_MAX_WIDTH, SPACING_16 } from '~/components/shared';
import { withComponents } from '~/utils';

const FeeCard = styled(Card.Clickable)`
  grid-template-columns: 1fr;
  grid-template-areas:
    'fee usage'
    'hint hint';
  width: auto;
  justify-content: space-between;

  @media (max-width: ${MOBILE_MAX_WIDTH}px) {
    padding: ${SPACING_16};
  }
`;

const FeePercentage = styled(Typography)`
  grid-area: fee;
`;

const Hint = styled(Typography).attrs({
  variant: 'small',
  color: 'secondary',
})`
  grid-area: hint;
  justify-self: center;
`;

const UsagePercentage = styled(Chip)`
  grid-area: usage;
  margin: 0.4rem;
`;

export default withComponents(FeeCard, {
  FeePercentage,
  Hint,
  UsagePercentage,
});
