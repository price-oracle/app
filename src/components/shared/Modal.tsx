import { FC } from 'react';
import styled from 'styled-components';
import { SPACING_16, SPACING_40, SPACING_512, SPACING_8 } from './Variables';

// import { Icon, CloseIcon } from './Icon';

const ModalHeader = styled.div`
  font-weight: bold;
  font-size: 2.88rem;
`;

const CloseModal = styled.div`
  padding: ${SPACING_8};
  position: absolute;
  right: ${SPACING_16};
  top: ${SPACING_16};
  cursor: pointer;
  transition: opacity 200ms ease-in-out;

  :hover {
    opacity: 0.8;
  }
`;

const StyledModal = styled.div`
  overflow: hidden;
  overflow-y: auto;
  padding: ${SPACING_40};
  background: red;
  border-radius: ${SPACING_8};
  color: white;
  position: relative;
  pointer-events: all;
  z-index: 1;
  width: ${SPACING_512};
  height: ${SPACING_512};
  max-width: 85%;
  max-height: 85%;
`;

export interface ModalProps {
  className?: string;
  header?: string;
  children?: any;
  onClose?: () => void;
}

export const Modal: FC<ModalProps> = ({ className, header, onClose, children, ...props }) => {
  let closeButton;

  if (onClose) {
    closeButton = <CloseModal onClick={onClose}>x{/* <Icon Component={CloseIcon} /> */}</CloseModal>;
  }
  return (
    <StyledModal className={className} {...props}>
      {closeButton}
      <ModalHeader>{header}</ModalHeader>

      {children}
    </StyledModal>
  );
};
