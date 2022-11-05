import { useState } from 'react';

import { THEME, THEME_TEXT_PRIMARY, IconButton, FONT_SIZE_16, SPACING_8 } from '~/components/shared';
import { useWindowDimensions } from '~/hooks/windowDimensions';
import { List, Item, Nav, IStylesProps } from './Navigator.styles';

interface INavigatorProps {
  handleClickCloseMenu: () => void;
  handleClickToggleMenu: () => void;
  showMenu: boolean;
  collapseOnMobile: boolean;
}
export const useNavigatorProps = (collapseOnMobile: boolean): INavigatorProps => {
  const [showMenu, setShowMenu] = useState(false);

  const handleClickToggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleClickCloseMenu = () => {
    setShowMenu(false);
  };

  return { showMenu, handleClickToggleMenu, handleClickCloseMenu, collapseOnMobile };
};

type IProps = {
  children: any;
  className?: string;
} & IStylesProps &
  INavigatorProps;
function Navigator({
  children,
  className,
  differenceMixBlend,
  handleClickCloseMenu,
  handleClickToggleMenu,
  showMenu,
  collapseOnMobile = true,
}: IProps) {
  const theme = THEME;
  const { isMobile } = useWindowDimensions();

  return (
    <Nav differenceMixBlend={differenceMixBlend}>
      <List onMouseLeave={handleClickCloseMenu} className={className}>
        {isMobile && collapseOnMobile && (
          <IconButton
            flip={showMenu}
            onClick={handleClickToggleMenu}
            name='chevron-down'
            color={THEME_TEXT_PRIMARY({
              theme,
            })}
            fontSize={FONT_SIZE_16()}
            padding={SPACING_8()}
          />
        )}
        {(!isMobile || showMenu || !collapseOnMobile) && children}
      </List>
    </Nav>
  );
}

export default Navigator;
