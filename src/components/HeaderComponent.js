import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import InfoIcon from '@mui/icons-material/Info';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { styled } from '@mui/system';

const CustomAppBar = styled(AppBar)({
  backgroundColor: '#24264d',
});

const Title = styled(Typography)({
  flexGrow: 1,
  textAlign: 'center',
});

const HeaderComponent = () => {
  return (
    <CustomAppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Title variant="h8">
          maria.soledad
        </Title>
        <IconButton edge="end" color="inherit" aria-label="notifications" sx={{ mr: 0.5 }}>
          <NotificationsIcon />
        </IconButton>
        <IconButton edge="end" color="inherit" aria-label="info" sx={{ mr: 0.5 }}>
          <InfoIcon />
        </IconButton>
        <IconButton edge="end" color="inherit" aria-label="fullscreen" sx={{ mr: 0.5 }}>
          <FullscreenIcon />
        </IconButton>
        <IconButton edge="end" color="inherit" aria-label="exit">
          <ExitToAppIcon />
        </IconButton>
      </Toolbar>
    </CustomAppBar>
  );
};

export default HeaderComponent;
