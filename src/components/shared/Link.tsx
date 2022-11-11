import styled from 'styled-components';

import { Typography } from './Typography';

export const Link = styled(Typography)`
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
`;
