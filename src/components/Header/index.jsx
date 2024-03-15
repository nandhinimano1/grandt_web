import React from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Tooltip,
  Avatar,
  Menu,
  MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import PropTypes from 'prop-types';

const settings = ['Profile', 'Account', 'Logout'];

const Header = ({
  handleDrawerToggle,
  userinfo,
  anchorElUser,
  handleOpenUserMenu,
  handleCloseUserMenu,
}) => {
  return (
    <AppBar
      position='fixed'
      sx={{
        width: { sm: `calc(100% - 240px)` },
        ml: { sm: `240px` },
        backgroundColor: '#fff',
      }}
    >
      <Toolbar>
        <IconButton
          color='inherit'
          aria-label='open drawer'
          edge='start'
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant='h6'
          noWrap
          component='div'
          sx={{ flexGrow: 1, color: '#000' }}
        >
          Grant Thornton
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
          <Box sx={{ marginRight: '3%', color: 'black', textAlign: 'right' }}>
            <Typography noWrap component='div'>
              {userinfo.username}
            </Typography>
            <Typography noWrap component='div' style={{ color: 'grey' }}>
              {userinfo.role}
            </Typography>
          </Box>
          <Tooltip title='Open settings'>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt='Manoj Yadav'>M</Avatar>
              <ArrowDropDownIcon />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id='menu-appbar'
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={handleCloseUserMenu}>
                <Typography textAlign='center'>{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
Header.propTypes = {
  handleDrawerToggle: PropTypes.func.isRequired,
  userinfo: PropTypes.shape({
    username: PropTypes.string,
    role: PropTypes.string,
  }).isRequired,
  anchorElUser: PropTypes.any,
  handleOpenUserMenu: PropTypes.func.isRequired,
  handleCloseUserMenu: PropTypes.func.isRequired,
};

export default Header;
