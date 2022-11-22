import { FC } from 'react';
import { ConnectButton as RainbowConnectButton } from '@rainbow-me/rainbowkit';
import styled from 'styled-components';

import { MOBILE_MAX_WIDTH } from './Variables';

const ButtonContainer = styled.div`
  mix-blend-mode: difference;
  border: 2px solid rgba(255, 255, 255, 0.12);

  div {
    border: none !important;
  }

  @media (max-width: ${MOBILE_MAX_WIDTH}px) {
    margin: 0 auto;
  }
`;

export const ConnectButton: FC = ({ ...props }) => (
  <ButtonContainer>
    <RainbowConnectButton accountStatus='address' chainStatus='none' {...props} />
  </ButtonContainer>
);
