import React, { createContext, useContext, useMemo, useState } from 'react';
import { CssBaseline, useMediaQuery } from '@material-ui/core';
import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider as MuiThemeProvider,
} from '@material-ui/core/styles';

type ColorScheme = {
  isDarkMode: boolean;
  toggleColorScheme: () => void;
};

const ColorSchemeContext = createContext<ColorScheme>({
  isDarkMode: false,
  toggleColorScheme: () => {},
});
export const useColorScheme = () => useContext(ColorSchemeContext);

type Props = {
  children: React.ReactNode;
};

const ThemeProvider = ({ children }: Props) => {
  const [isDarkMode, setIsDarkMode] = useState(
    useMediaQuery('(prefers-color-scheme: dark)', {
      noSsr: true,
    })
  );

  const toggleColorScheme = () => {
    setIsDarkMode((val) => !val);
  };

  const theme = useMemo(
    () =>
      responsiveFontSizes(
        createMuiTheme({
          palette: {
            primary: {
              main: '#8739e5',
            },
            type: isDarkMode ? 'dark' : 'light',
          },
          overrides: {
            MuiCssBaseline: {
              '@global': {
                body: {
                  transition: 'color 200ms ease, background-color 200ms ease',
                },
              },
            },
          },
          props: {
            MuiButton: {
              disableElevation: true,
            },
            MuiAppBar: {
              elevation: 0,
            },
            MuiLink: {
              color: 'inherit',
            },
          },
        })
      ),
    [isDarkMode]
  );

  return (
    <ColorSchemeContext.Provider value={{ isDarkMode, toggleColorScheme }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ColorSchemeContext.Provider>
  );
};

export default ThemeProvider;
