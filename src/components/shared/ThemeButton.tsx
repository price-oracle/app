import { THEME, toggleTheme } from './theme/theme.selector';
// import useAppDispatch from '../../hooks/useAppDispatch';
import { IconName } from './Icon';
import { FONT_SIZE_16, SPACING_8 } from './Variables';
import { IconButton } from './IconButton';

export const ThemeButton = ({ color }: { color: string }) => {
  const isLightTheme = THEME.type === 'light';
  // const dispatch = useAppDispatch();

  const dispatchSwithTheme = () => {
    // dispatch(switchTheme());
    toggleTheme();
  };

  const themeIcon = isLightTheme ? 'moon' : 'sun';

  return (
    <IconButton
      onClick={dispatchSwithTheme}
      color={color}
      name={themeIcon}
      fontSize={FONT_SIZE_16()}
      padding={SPACING_8()}
    />
  );
};
