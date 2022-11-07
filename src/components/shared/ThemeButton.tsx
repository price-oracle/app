import { useDispatch } from 'react-redux';

import { useAppSelector } from '~/store';
import { ThemeActions } from '~/store/index';
import { ThemeName } from '~/types/Settings';
import { IconButton } from './IconButton';
import { getTheme } from './theme';
import { FONT_SIZE_16, SPACING_8 } from './Variables';

export const ThemeButton = ({ color }: { color?: string }) => {
  const dispatch = useDispatch();
  const currentTheme = useAppSelector(({ theme }) => theme.current);
  const theme = getTheme(currentTheme);

  const isLightTheme = currentTheme === 'light';

  const dispatchToggleTheme = () => {
    const dispatchTheme: ThemeName = isLightTheme ? 'dark' : 'light';
    dispatch(ThemeActions.changeTheme({ theme: dispatchTheme }));
  };

  const themeIcon = isLightTheme ? 'moon' : 'sun';

  return (
    <IconButton
      onClick={dispatchToggleTheme}
      color={color || theme.textPrimary}
      name={themeIcon}
      fontSize={FONT_SIZE_16()}
      padding={SPACING_8()}
    />
  );
};
