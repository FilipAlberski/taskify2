import { createTheme } from '@mui/material';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    // background: {
    //   default: 'darkslategray',
    //   paper: '#1E1E1E',
    // },
    // primary: {
    //   main: '#FFFFFF',
    // },
  },
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    // background: {
    //   default: '#F5F5F5',
    //   paper: '#FFFFFF',
    // },
    // primary: {
    //   main: '#1ff',
    // },
  },
});

export { darkTheme, lightTheme };
