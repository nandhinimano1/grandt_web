import React from 'react';
import { Link } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Toolbar,
  Box,
} from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import PropTypes from 'prop-types';

const Sidebar = ({ mobileOpen, handleDrawerToggle, window, drawerWidth }) => {
  const container = window !== undefined ? window().document.body : undefined;
  const listItems = [
    {
      text: 'Onboard',
      icon: <InboxIcon aria-label='Inbox' />,
      to: '/onboard',
      testid: 'onboard-link',
    },
    {
      text: 'Result Summary',
      icon: <MailIcon aria-label='Mail' />,
      to: '/result-summary',
      testid: 'result-summary-link',
    },
  ];

  // To avoid duplication, you can create the list markup separately.
  const listMarkup = (
    <List>
      {listItems.map((item) => (
        <ListItem key={item.text} disablePadding data-testid={item.testid}>
          <ListItemButton
            data-testid={`${item.text.toLowerCase()}-link`}
            component={Link}
            to={item.to}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );

  return (
    <Box
      component='nav'
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label='mailbox folders'
    >
      {/* Temporary drawer for mobile view */}
      <Drawer
        data-testid='temporary'
        container={container}
        variant='temporary'
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
        PaperProps={{ 'aria-hidden': !mobileOpen }} // Dynamically set aria-hidden
      >
        <Toolbar />
        <Divider />
        {listMarkup}
      </Drawer>

      {/* Permanent drawer for desktop view */}
      <Drawer
        data-testid='permanent'
        variant='permanent'
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
        open
        PaperProps={{ 'aria-hidden': mobileOpen }} // Dynamically set aria-hidden
      >
        <Toolbar />
        <Divider />
        {listMarkup}
      </Drawer>
    </Box>
  );
};

Sidebar.propTypes = {
  mobileOpen: PropTypes.bool.isRequired,
  handleDrawerToggle: PropTypes.func.isRequired,
  window: PropTypes.any,
  drawerWidth: PropTypes.number,
};

export default Sidebar;
