//theme
import { darkTheme, lightTheme } from './utils/theme.js';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Outlet } from 'react-router-dom';
import useAuthInit from '../src/utils/useAuthInit';

//TODO create redux store and get the theme from there
const uiTheme = 'dark';

function App() {
  useAuthInit();
  return (
    <>
      <ThemeProvider
        theme={uiTheme === 'dark' ? darkTheme : lightTheme}
      >
        <CssBaseline />
        <Outlet />
      </ThemeProvider>
    </>
  );
}

export default App;
