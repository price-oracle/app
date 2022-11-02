import styled from 'styled-components';
import {
  THEME_TEXT_PRIMARY,
  THEME_BACKGROUND,
  THEME_BORDER,
} from './theme/theme.selector';
import { FONT_SIZE_20, SPACING_16, SPACING_48 } from './Variables';
import Button from './Button';

interface ContainerProps {
  height?: string;
}
const Container = styled.div<ContainerProps>`
  position: relative;
  height: ${(props) => props.height || '60px'};
`;

interface ButtonProps {
  disabled?: boolean;
}
const SButton = styled(Button) <ButtonProps>`
  background-color: ${THEME_TEXT_PRIMARY};
  border: ${THEME_BORDER};
  color: ${THEME_BACKGROUND};
  font-size: ${FONT_SIZE_20};
  font-weight: 600;
  left: 50%;
  letter-spacing: 0em;
  padding: ${SPACING_16} ${SPACING_48};
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  font-family: PlusJakartaSans;
  font-weight: 600;

  &:hover:enabled {
    background-color: ${THEME_TEXT_PRIMARY};
    border: unset;
    color: ${THEME_BACKGROUND};
    left: calc(50% - 8px);
    top: calc(50% - 8px);

    &:before {
      background-color: unset;
      border: 2px solid ${THEME_TEXT_PRIMARY};
      bottom: -10px;
      box-sizing: border-box;
      content: '';
      height: 10px;
      left: 5px;
      position: absolute;
      transform: skewX(45deg);
      width: 100%;
    }

    &:after {
      background-color: unset;
      border: 2px solid ${THEME_TEXT_PRIMARY};
      box-sizing: border-box;
      content: '';
      height: 100%;
      position: absolute;
      right: -10px;
      top: 5px;
      transform: skewY(45deg);
      width: 10px;
    }
  }
`;

type BoxButtonProps = {
  children?: any;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export const BoxButton = ({
  children,
  height,
  className,
  onClick,
  disabled,
}: BoxButtonProps & ContainerProps & ButtonProps) => {
  return (
    <Container height={height}>
      <SButton className={className} onClick={onClick} disabled={disabled}>
        {children}
      </SButton>
    </Container>
  );
};

