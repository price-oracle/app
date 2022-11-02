import {
  THEME,
  toggleTheme
} from './theme/theme.selector';
// import useAppDispatch from '../../hooks/useAppDispatch';
import { IconName } from './Icon';
import { FONT_SIZE_16, SPACING_8 } from './Variables';
import IconButton from './IconButton';

export const useThemeButtonProps = (): [IconName, () => void] => {
  const isLightTheme = THEME.type === 'light';
  // const dispatch = useAppDispatch();

  const dispatchSwithTheme = () => {
    // dispatch(switchTheme());
    toggleTheme();
  };

  const themeIconName = isLightTheme ? 'moon' : 'sun';

  return [themeIconName, dispatchSwithTheme];
};

const ThemeButton = ({ color }: { color: string }) => {
  const [themeIcon, toggleTheme] = useThemeButtonProps();

  return (
    <IconButton
      onClick={toggleTheme}
      color={color}
      name={themeIcon}
      fontSize={FONT_SIZE_16()}
      padding={SPACING_8()}
    />
  );
};

export default ThemeButton;
