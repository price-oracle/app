import { FC } from 'react';
import { ConnectButton as RainbowConnectButton } from '@rainbow-me/rainbowkit';
import styled from 'styled-components';

const ButtonContainer = styled.div`
  mix-blend-mode: difference;
  border: 2px solid rgba(255, 255, 255, 0.12);

  div {
    border: none !important;
  }
`;

export const ConnectButton: FC = ({ ...props }) => (
  <ButtonContainer>
    <RainbowConnectButton accountStatus='address' chainStatus='none' {...props} />
  </ButtonContainer>
);
