import styled from 'styled-components';
import { MOBILE_MAX_WIDTH, Button } from '~/components/shared';

export const HeaderButton = styled(Button)`
  border-bottom: unset;

  @media (max-width: ${MOBILE_MAX_WIDTH}) {
    width: 100%;
  }
`;
