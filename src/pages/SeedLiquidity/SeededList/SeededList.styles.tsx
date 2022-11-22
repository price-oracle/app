import styled from 'styled-components';

import {
  Card,
  SPACING_16,
  SPACING_32,
  SPACING_40,
  SPACING_96,
  SPACING_128,
  SPACING_192,
  SPACING_832,
} from '~/components/shared';

export const SCard = styled(Card)`
  margin: ${SPACING_32} auto;
  overflow-x: auto;
  max-width: ${SPACING_832};
  justify-items: left;
`;

export const Row = styled.div`
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: ${() =>
    [SPACING_40(), SPACING_128(), SPACING_96(), SPACING_192(), SPACING_192(), SPACING_96()].join(' ')};
  justify-content: right;
  align-items: center;
  margin: 0 auto;
  justify-items: left;
`;

export const Header = styled(Row)`
  margin: ${SPACING_16} auto;
`;
