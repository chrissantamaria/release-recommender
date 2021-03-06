import { ReactNode, createContext, useContext, useMemo, useState } from 'react';
import invariant from 'tiny-invariant';
import { CssBaseline } from '@material-ui/core';
import {
  ThemeProvider as MuiThemeProvider,
  createMuiTheme,
  responsiveFontSizes,
} from '@material-ui/core/styles';

import './globals.css';
import './fonts.scss';

type ColorScheme = {
  isDarkMode: boolean;
  toggleColorScheme: () => void;
};

const ColorSchemeContext = createContext<null | ColorScheme>(null);

export const useColorScheme = () => {
  const context = useContext(ColorSchemeContext);
  invariant(context, 'useColorScheme must be used within a ColorSchemeContext');
  return context;
};

type Props = {
  children: ReactNode;
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
          typography: {
            fontFamily: [
              'Inter',
              '-apple-system',
              'BlinkMacSystemFont',
              '"Segoe UI"',
              'Roboto',
              '"Helvetica Neue"',
              'Arial',
              'sans-serif',
              '"Apple Color Emoji"',
              '"Segoe UI Emoji"',
              '"Segoe UI Symbol"',
            ].join(','),
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
