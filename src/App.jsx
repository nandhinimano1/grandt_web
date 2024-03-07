import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Dashboard />
    </ThemeProvider>
  );
}

export default App;
