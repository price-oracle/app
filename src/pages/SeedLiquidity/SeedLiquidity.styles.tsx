import styled from 'styled-components';

import { Card, SPACING_512, SPACING_768, SPACING_24 } from '~/components/shared';

export const Container = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 auto;
  width: 100%;
  padding: ${SPACING_24};
  max-width: ${SPACING_768};
  height: ${SPACING_512};
`;
