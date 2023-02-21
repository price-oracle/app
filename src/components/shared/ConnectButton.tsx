import { FC } from 'react';
import { ConnectButton as RainbowConnectButton } from '@rainbow-me/rainbowkit';
import styled from 'styled-components';

import { MOBILE_MAX_WIDTH } from './Variables';

const ButtonContainer = styled.div`
  &:hover {
    opacity: 80% !important;
  }

  & div {
    border: none !important;
    color: ${(props) => props.theme.textPrimary};
  }

  & button {
    color: ${(props) => props.theme.textPrimary} !important;
    border: ${(props) => props.theme.borderPrimary} !important;
    height: 4.25rem !important;
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
