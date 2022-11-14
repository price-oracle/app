import { FC } from 'react';
import { ThemeProvider } from 'styled-components';

import { getTheme } from '~/components/shared';
import { useAppSelector } from '~/hooks';

type Props = {
  children?: React.ReactNode;
};

export const Themable: FC<Props> = ({ children }) => {
  const currentTheme = useAppSelector(({ theme }) => theme.current);
  const theme = getTheme(currentTheme);
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
