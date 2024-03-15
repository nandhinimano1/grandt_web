import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from '../Header';
import Sidebar from '../Sidebar';
import { Outlet } from 'react-router-dom';

const settings = ['Profile', 'Account', 'Logout'];

const drawerWidth = 240;

function Dashboard(props) {
  const { window } = props;

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

  const [userinfo, setuserinfo] = React.useState({
    username: '',
    role: 'Business Analyst',
  });
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  React.useEffect(() => {
    setTimeout(() => {
      setuserinfo({ username: 'Manoj Yadav', role: 'Manager' });
    }, [1000]);

    if (!settings.find((i) => i === 'Settings')) {
      settings.push('Settings');
    }
  }, [isDesktop]);

  return (
    <Box sx={{ display: 'flex' }} data-testid='dashboard'>
      <CssBaseline />
      <Header
        handleDrawerToggle={handleDrawerToggle}
        userinfo={userinfo}
        anchorElUser={anchorElUser}
        handleOpenUserMenu={handleOpenUserMenu}
        handleCloseUserMenu={handleCloseUserMenu}
      />
      <Sidebar
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        window={window}
        drawerWidth={drawerWidth}
      />
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}

Dashboard.propTypes = {
  window: PropTypes.func,
};

export default Dashboard;
