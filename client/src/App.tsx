//theme
import { darkTheme, lightTheme } from './utils/theme.js';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Outlet } from 'react-router-dom';

import { useCheckAuthQuery } from './slices/usersApiSlice.js';
import { useDispatch } from 'react-redux';
import { setCredentials } from './slices/authSlice.js';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

//TODO create redux store and get the theme from there
const uiTheme = 'dark';

function App() {
  const dispatch = useDispatch();

  const { data, isLoading } = useCheckAuthQuery();

  useEffect(() => {
    if (data) {
      dispatch(setCredentials({ ...data }));
    }
  }, [data, dispatch]);

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
