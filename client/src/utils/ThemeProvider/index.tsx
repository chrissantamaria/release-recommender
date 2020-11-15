import React, { createContext, useContext, useMemo, useState } from 'react';
import { CssBaseline } from '@material-ui/core';
import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider as MuiThemeProvider,
} from '@material-ui/core/styles';

import './globals.css';

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
  const [isDarkMode, setIsDarkMode] = useState(true);

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
                html: {
                  height: '100%',
                },
                body: {
                  height: '100%',
                  transition: 'color 200ms ease, background-color 200ms ease',
                },
                '#root': {
                  height: '100%',
                },
              },
            },
            MuiButton: {
              root: {
                fontSize: '1rem',
                textTransform: 'lowercase',
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
            MuiPaper: {
              elevation: 0,
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
