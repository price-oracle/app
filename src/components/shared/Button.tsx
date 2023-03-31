import { FC } from 'react';
import styled from 'styled-components';

import { SPACING_12, SPACING_4 } from './Variables';
import { PropTheme } from './theme';

const WithoutStyles = styled.button`
  transition: unset;
  background: none;
  border: none;
  color: inherit;
  font: inherit;
  outline: inherit;
  padding: 0;
`;

export interface ButtonProps {
  disabled?: boolean;
  onClick?: (e?: any) => void;
  children?: React.ReactNode;
  className?: string;
}

export const Button: FC<ButtonProps> = ({ className, disabled, onClick, children, ...props }) => (
  <StyledButton className={className} disabled={disabled} onClick={onClick} {...props}>
    {children}
  </StyledButton>
);

const WithoutColors = styled(WithoutStyles)<PropTheme>`
  display: flex;
  box-sizing: border-box;
  color: ${(props) => props.theme.textPrimary};
  white-space: nowrap;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  line-height: 1.25em;
`;

const StyledButton = styled(WithoutColors)`
  &:disabled {
    color: ${(props) => props.theme.textDisabled};
    background-color: ${(props) => props.theme.actionDisabledBackground};
    cursor: default;
  }

  &:enabled {
    &:hover {
      background-color: ${(props) => props.theme.actionHover};
    }

    &:active {
      background-color: ${(props) => props.theme.actionSelected};
    }
  }
`;

export const PrimaryButton = styled(Button)`
  background-color: ${(props) => props.theme.buttonBackground};
  border: ${(props) => props.theme.borderPrimary};
  color: ${(props) => props.theme.background};
  padding: ${SPACING_4} ${SPACING_12};

  &:enabled {
    &:hover {
      background-color: ${(props) => props.theme.textSecondary};
    }

    &:active {
      background-color: ${(props) => props.theme.textDisabled};
    }
  }
`;

export const SecondaryButton = styled(WithoutColors)`
  padding: ${SPACING_4} ${SPACING_12};
  border: ${(props) => props.theme.border};

  &:enabled {
    &:hover {
      text-decoration: underline;
    }
  }

  &:disabled {
    color: ${(props) => props.theme.textDisabled};
    cursor: default;
  }
`;
export default Button;
