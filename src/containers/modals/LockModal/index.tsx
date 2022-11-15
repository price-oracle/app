import { FC } from 'react';
import styled from 'styled-components';

import Lock from './Lock';
import { SPACING_512, SPACING_32 } from '~/components/shared';
import { PoolManager } from '~/types/PoolManager';

export interface TestModalProps {
  onClose: () => void;
  modalProps: PoolManager;
}

const StyledModal = styled.div`
  overflow: hidden;
  overflow-y: auto;
  margin: ${SPACING_32};
  color: white;
  position: relative;
  pointer-events: all;
  z-index: 1;
  width: ${SPACING_512};
  max-width: 85%;
  max-height: 85%;
`;

export const LockModal: FC<TestModalProps> = ({ onClose, modalProps, ...props }) => {
  return (
    <StyledModal>
      <Lock modalProps={modalProps} {...props} />
    </StyledModal>
  );
};
