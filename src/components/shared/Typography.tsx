import { MouseEventHandler, useMemo } from 'react';
// import { useSelector } from 'react-redux';
import styled from 'styled-components';

import {
  THEME,
  THEME_BACKGROUND,
  THEME_DISABLED,
  THEME_TEXT_PRIMARY,
  THEME_TEXT_SECONDARY,
} from './theme/theme.selector';
import { FONT_SIZE_20, FONT_SIZE_16, FONT_SIZE_12, FONT_SIZE_24 } from './Variables';

interface BaseProps {
  allowWrap?: boolean;
  color?: string;
}
const BaseComponent = styled.div<BaseProps>`
  color: ${(props) => props.color};
  display: inline-block;
  font-family: PlusJakartaSans;
  font-weight: 600;
  line-height: 1.25em;
  white-space: ${({ allowWrap }) => (allowWrap ? 'normal' : 'nowrap')};
`;

const XLarge = styled(BaseComponent)`
  font-size: ${FONT_SIZE_24};
`;

const Large = styled(BaseComponent)`
  font-size: ${FONT_SIZE_20};
`;

const Medium = styled(BaseComponent)`
  font-size: ${FONT_SIZE_16};
`;

const Small = styled(BaseComponent)`
  font-size: ${FONT_SIZE_12};
`;

export type TypographyVariant = 'x-large' | 'large' | 'medium' | 'small';

interface Props {
  allowWrap?: boolean;
  children?: any;
  className?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
  variant?: TypographyVariant;
  color?: 'primary' | 'secondary' | 'disabled' | 'background';
}
export const Typography = ({ allowWrap, children, variant, color, ...otherProps }: Props) => {
  const Component = useMemo(() => {
    switch (variant) {
      case 'x-large':
        return XLarge;
      case 'large':
        return Large;
      case 'medium':
        return Medium;
      case 'small':
        return Small;
      default:
        return Medium;
    }
  }, [variant]);

  // const theme = useSelector(selectedTheme);
  const theme = THEME;

  const _color = useMemo(() => {
    switch (color) {
      case 'background':
        return THEME_BACKGROUND({ theme });
      case 'disabled':
        return THEME_DISABLED({ theme });
      case 'primary':
        return THEME_TEXT_PRIMARY({ theme });
      case 'secondary':
        return THEME_TEXT_SECONDARY({ theme });
      default:
        return THEME_TEXT_PRIMARY({ theme });
    }
  }, [color, theme]);

  return (
    <Component allowWrap={allowWrap} color={_color} {...otherProps}>
      {children}
    </Component>
  );
};
