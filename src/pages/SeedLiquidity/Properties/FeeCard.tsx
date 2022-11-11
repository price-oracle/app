import styled from 'styled-components';

import Card from '~/components/shared/Card';
import { Chip, Typography } from '~/components/shared';
import { withComponents } from '~/utils';

const FeeCard = styled(Card.Clickable)`
  grid-template-columns: 1fr;
  grid-template-areas:
    'fee usage'
    'hint hint';

  width: 12.5rem;
  justify-content: space-between;
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
`;

export default withComponents(FeeCard, {
  FeePercentage,
  Hint,
  UsagePercentage,
});
