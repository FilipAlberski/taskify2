import React, { useState, useCallback } from 'react';
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
  styled,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close'; // Import Close icon
import { Outlet } from 'react-router-dom';

const drawerWidth = 250;

const MainContent = styled('div')(({ theme, isMobile }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  marginLeft: isMobile ? 0 : drawerWidth,
}));

const SharedLayout: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = useCallback(() => {
    setOpenDrawer(!openDrawer);
  }, [openDrawer]);

  const closeDrawer = useCallback(() => {
    setOpenDrawer(false);
  }, []);

  return (
    <div>
      <AppBar position="static">
        <Toolbar
          sx={{
            left: isMobile ? '0px' : `${drawerWidth}px`,
            width: isMobile
              ? '100%'
              : `calc(100% - ${drawerWidth}px)`,
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer}
          >
            {openDrawer ? <CloseIcon /> : <MenuIcon />}{' '}
            {/* Toggle between icons */}
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Taskify
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        open={isMobile ? openDrawer : true}
        variant={isMobile ? 'temporary' : 'permanent'}
        onClose={closeDrawer}
        sx={{
          width: drawerWidth,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            bgcolor: 'background.default',
          },
        }}
      >
        <Typography variant="h4" sx={{ p: 2 }}>
          Taskify
        </Typography>
        <List>
          <ListItemButton onClick={closeDrawer}>
            <ListItemText primary="Option 1" />
          </ListItemButton>
          <ListItemButton onClick={closeDrawer}>
            <ListItemText primary="Option 2" />
          </ListItemButton>
          <ListItemButton onClick={closeDrawer}>
            <ListItemText primary="Option 3" />
          </ListItemButton>
        </List>
      </Drawer>
      <MainContent isMobile={isMobile}>
        <Outlet />
      </MainContent>
    </div>
  );
};

export default SharedLayout;
