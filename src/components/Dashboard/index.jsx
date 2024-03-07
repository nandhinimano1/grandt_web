import * as React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import OnBoarding from '../../pages/OnBoarding/OnBoarding';
import ResultSummary from '../../pages/ResultSummary/ResultSummary';
import { Avatar, Button, Menu, MenuItem, Tooltip } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const settings = ['Profile', 'Account', 'Logout'];

const drawerWidth = 240;

function Dashboard(props) {
  const { window } = props;

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleOpenUserMenu = event => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {['Onboard', 'Result Summary'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton component={Link} to={text === 'Onboard' ? '/onboard' : '/result-summary'}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container = window !== undefined ? window().document.body : undefined;

  React.useEffect(() => {
    if (!settings.find(i => i === 'Settings')) {
      settings.push('Settings');
    }
  }, [isDesktop]);

  return (
    <Router>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          position='fixed'
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
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
            <Typography variant='h6' noWrap component='div' sx={{ flexGrow: 1, color: '#000' }}>
              Grant Thornton
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
              <Box sx={{ marginRight: '3%', color: 'black', textAlign: 'right' }}>
                <Typography noWrap component='div'>
                  Manoj Yadav
                </Typography>
                <Typography noWrap component='div' style={{ color: 'grey' }}>
                  Business Analyst
                </Typography>
              </Box>{' '}
              <Tooltip title='Open settings'>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt='Manoj Yadav'>M</Avatar>
                  <ArrowDropDownIcon />
                </IconButton>
              </Tooltip>
              {isDesktop && (
                <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
                  <Typography variant='body1' sx={{ color: '#d6d0d0' }}>
                    |
                  </Typography>
                  <IconButton size='large' edge='end' sx={{ ml: 2, m: '6px 8px' }}>
                    <SettingsIcon />
                  </IconButton>
                  <Typography variant='body1' sx={{ color: '#d6d0d0', p: '6px 8px' }}>
                    |
                  </Typography>
                  <Button sx={{ color: 'gray' }}>PL</Button>
                  <Typography variant='body1' sx={{ color: '#d6d0d0' }}>
                    |
                  </Typography>
                  <Button sx={{ fontWeight: 'bold', color: 'black' }}>EN</Button>
                </Box>
              )}
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
                {settings.map(setting => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign='center'>{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>
        <Box component='nav' sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label='mailbox folders'>
          <Drawer
            container={container}
            variant='temporary'
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant='permanent'
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box component='main' sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
          <Toolbar />
          <Routes>
            <Route path='/onboard' element={<OnBoarding />} />
            <Route path='/result-summary' element={<ResultSummary />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

Dashboard.propTypes = {
  window: PropTypes.func,
};

export default Dashboard;
