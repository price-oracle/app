import { FC } from 'react';
import { ThemeProvider } from 'styled-components';

import { getTheme } from '~/components/shared';
import { useAppSelector } from '~/store';

export const Themable: FC = ({ children }) => {
  const currentTheme = useAppSelector(({ theme }) => theme.current);
  const theme = getTheme(currentTheme);
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
