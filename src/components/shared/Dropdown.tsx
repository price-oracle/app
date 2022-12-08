import { createContext, useContext, useRef, useState } from 'react';
import styled from 'styled-components';

import Button from './Button';
import { Icon } from './Icon';
import { withComponents } from '~/utils';
import { FONT_SIZE_12, SPACING_8, SPACING_16 } from './Variables';
import { useOnClickOutside } from '~/hooks';

export interface IDropdownContext {
  show: boolean;
  setShow: (show: boolean) => void;
}

export type IDropdown = {
  children: any;
  className?: string;
} & IDropdownContext;

export interface IDropdownButton {
  children: any;
  className?: string;
}

export interface IDropdownModal {
  children: any;
  className?: string;
}

const Container = styled.section`
  background-color: ${(props) => props.theme.background};
  position: relative;
`;

const Modal = styled.section`
  background-color: ${(props) => props.theme.background};
  border: ${(props) => props.theme.broder};
  font-weight: 600;
  left: 50%;
  margin-top: ${SPACING_16};
  position: absolute;
  text-align: center;
  transform: translateX(-50%);
  white-space: nowrap;
  z-index: 1;
`;

const DropdownContext = createContext<IDropdownContext>({
  show: false,
  setShow: () => null,
});

const useDropdownContext = () => {
  return useContext(DropdownContext);
};

const useDropdownProps = () => {
  const [show, setShow] = useState(false);

  return { show, setShow };
};

const DropdownButton = ({ children, className }: IDropdownButton) => {
  const { show, setShow } = useDropdownContext();

  const handleClick = () => setShow(!show);

  return (
    <Button onClick={handleClick} className={className}>
      {children}
      <Icon name='chevron-down' size={FONT_SIZE_12()} padding={SPACING_8()} rotate={show ? 180 : 0} />
    </Button>
  );
};

const DropdownModal = ({ children, className }: IDropdownModal) => {
  const { show } = useDropdownContext();

  if (!show) return <></>;

  return <Modal className={className}>{children}</Modal>;
};

const Dropdown = ({ children, className, show, setShow }: IDropdown) => {
  const ref = useRef<any>();
  useOnClickOutside(ref, () => setShow(false));

  return (
    <Container className={className} ref={ref}>
      <DropdownContext.Provider
        value={{
          setShow,
          show,
        }}
      >
        {children}
      </DropdownContext.Provider>
    </Container>
  );
};

export default withComponents(Dropdown, {
  Button: DropdownButton,
  Modal: DropdownModal,
  useProps: useDropdownProps,
});
