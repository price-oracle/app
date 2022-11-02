import { useState } from 'react';

import { THEME, THEME_TEXT_PRIMARY, IconButton, FONT_SIZE_16, SPACING_8 } from '~/components/shared';
import { useIsDesktop } from './hooks';
import { List, Item, Nav, IStylesProps } from './Navigator.styles';

interface INavigatorProps {
  handleClickCloseMenu: () => void;
  handleClickToggleMenu: () => void;
  showMenu: boolean;
}
export const useNavigatorProps = (): INavigatorProps => {
  const [showMenu, setShowMenu] = useState(false);

  const handleClickToggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleClickCloseMenu = () => {
    setShowMenu(false);
  };

  return { showMenu, handleClickToggleMenu, handleClickCloseMenu };
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
}: IProps) {
  const theme = THEME;
  const isDesktop = useIsDesktop();

  return (
    <Nav differenceMixBlend={differenceMixBlend}>
      <List onMouseLeave={handleClickCloseMenu} className={className}>
        {isDesktop || (
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
        {(isDesktop || showMenu) && children}
      </List>
    </Nav>
  );
}

export default Navigator;
