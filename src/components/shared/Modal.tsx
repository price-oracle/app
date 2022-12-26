import { FC } from 'react';
import styled from 'styled-components';

import { useAppSelector } from '~/hooks';
import { Icon } from './Icon';
import { getTheme } from './theme';
import { SPACING_16, SPACING_32, SPACING_512, SPACING_8 } from './Variables';

// import { Icon, CloseIcon } from './Icon';

const ModalHeader = styled.div`
  font-weight: bold;
  font-size: 2.88rem;
`;

const CloseModal = styled.div`
  padding: 0.1rem;
  position: absolute;
  right: 0.1rem;
  top: 0rem;
  cursor: pointer;
  transition: opacity 200ms ease-in-out;

  :hover {
    opacity: 0.8;
  }
`;

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
  border: ${(props) => props.theme.borderPrimary};
`;

export interface ModalProps {
  className?: string;
  header?: string;
  children?: any;
  onClose?: () => void;
}

export const Modal: FC<ModalProps> = ({ className, header, onClose, children, ...props }) => {
  let closeButton;
  const currentTheme = useAppSelector(({ theme }) => theme.current);
  const theme = getTheme(currentTheme);

  if (onClose) {
    closeButton = (
      <CloseModal onClick={onClose}>
        <Icon name='close' size={SPACING_16()} padding={SPACING_8()} color={theme.textSecondary} />
      </CloseModal>
    );
  }
  return (
    <StyledModal className={className} {...props}>
      {closeButton}
      <ModalHeader>{header}</ModalHeader>

      {children}
    </StyledModal>
  );
};
