import React from 'react';
import {
  useTheme,
  useMediaQuery,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Box,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import { Outlet } from 'react-router-dom';

const SharedLayout = () => {
  const theme = useTheme();
  console.log(theme);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [openDrawer, setOpenDrawer] = React.useState(false);

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  const closeDrawer = () => {
    setOpenDrawer(false);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar
          sx={{
            left: isMobile ? '0px' : '250px',
            width: isMobile ? '100%' : 'calc(100% - 250px)',
          }}
        >
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        open={isMobile ? openDrawer : true}
        variant={isMobile ? 'temporary' : 'permanent'}
        ModalProps={{
          onBackdropClick: closeDrawer,
        }}
        sx={{
          '& .MuiDrawer-paper': {
            bgcolor: 'background.default',
          },
        }}
      >
        <Typography variant="h4" sx={{ p: 2 }}>
          Taskify
        </Typography>

        <List sx={{ width: 250 }}>
          <ListItemButton>
            <ListItemText primary="Option 1" onClick={closeDrawer} />
          </ListItemButton>
          <ListItemButton>
            <ListItemText primary="Option 2" />
          </ListItemButton>
          <ListItemButton>
            <ListItemText primary="Option 3" />
          </ListItemButton>
        </List>
      </Drawer>
      <Outlet />
    </div>
  );
};

export default SharedLayout;
