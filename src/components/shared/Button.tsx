import styled from 'styled-components';
import { FC } from 'react';

import {
  THEME_ACTION_DISABLED,
  THEME_ACTION_DISABLED_BACKGROUND,
  THEME_ACTION_HOVER,
  THEME_ACTION_SELECTED,
  THEME_BACKGROUND,
  THEME_BORDER,
  THEME_DISABLED,
  THEME_TEXT_PRIMARY,
  THEME_TEXT_SECONDARY,
} from './theme/theme.selector';
import { SPACING_12, SPACING_4 } from './Variables';

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
}

export const Button: FC<ButtonProps> = ({ disabled, onClick, children, ...props }) => (
  <StyledButton disabled={disabled} onClick={onClick} {...props}>
    {children}
  </StyledButton>
);

const WithoutColors = styled(WithoutStyles)`
  display: flex;
  box-sizing: border-box;
  color: ${THEME_TEXT_PRIMARY};
  white-space: nowrap;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  line-height: 1.25em;
`;

const StyledButton = styled(WithoutColors)`
  &:disabled {
    color: ${THEME_ACTION_DISABLED};
    background-color: ${THEME_ACTION_DISABLED_BACKGROUND};
    cursor: default;
  }

  &:enabled {
    &:hover {
      background-color: ${THEME_ACTION_HOVER};
    }

    &:active {
      background-color: ${THEME_ACTION_SELECTED};
    }
  }
`;

export const PrimaryButton = styled(Button)`
  background-color: ${THEME_TEXT_PRIMARY};
  border: ${THEME_BORDER};
  color: ${THEME_BACKGROUND};
  padding: ${SPACING_4} ${SPACING_12};

  // TODO: improve design system to have hover & selected values for complementary color
  &:enabled {
    &:hover {
      background-color: ${THEME_TEXT_SECONDARY};
    }

    &:active {
      background-color: ${THEME_DISABLED};
    }
  }
`;

export const SecondaryButton = styled(WithoutColors)`
  padding: ${SPACING_4} ${SPACING_12};

  &:enabled {
    &:hover {
      text-decoration: underline;
    }
  }

  &:disabled {
    color: ${THEME_DISABLED};
    cursor: default;
  }
`;
export default Button;
