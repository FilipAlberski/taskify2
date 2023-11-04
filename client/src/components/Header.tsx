import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            My Application
          </Typography>
          {/* Add more header content here if needed */}
        </Toolbar>
      </AppBar>
      <Outlet />
    </>
  );
};

export default Header;
