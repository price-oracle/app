import { FC } from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  background: red;
`;

export interface ButtonProps {
  disabled?: boolean;
  onClick?: (e?: any) => void;
  children?: React.ReactNode;
}

export const Button: FC<ButtonProps> = ({ disabled, onClick, children, ...props }) => (
  <StyledButton disabled={disabled} onClick={onClick} {...props}>
    {children}
  </StyledButton>
);
