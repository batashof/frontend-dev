import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';

import { Box, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from 'components/Header';
import Sidebar from 'components/Sidebar';
import Dashboard from 'pages/Dashboard';
import DriverDetails from 'pages/DriverDetails';
import Drivers from 'pages/Drivers';
import FinancialReports from 'pages/FinancialReports';
import FleetManagement from 'pages/FleetManagement';
import ImportData from 'pages/ImportData';
import LoginForm from 'pages/LoginForm';
import User from 'pages/User';
import { RootState } from 'store/store';

import './i18n';

const theme = createTheme({
  palette: {
    success: {
      main: '#ADFFAA'
    },
    info: {
      main: '#AAD2FF'
    },
    error: {
      main: '#FFA7A9'
    },
    warning: {
      main: '#FFDD8C'
    }
  },
  typography: {
    fontFamily: 'Montserrat, sans-serif'
  },
  components: {
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontSize: '0.875rem',
          fontWeight: 600
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          '&:first-of-type': {
            borderTopLeftRadius: '20px',
            borderBottomLeftRadius: '20px'
          },
          '&:last-of-type': {
            borderTopRightRadius: '20px',
            borderBottomRightRadius: '20px'
          }
        },
        head: {
          backgroundColor: '#E2E3E3',
          padding: '10px 16px'
        }
      }
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          backgroundColor: 'white',
          marginBottom: '10px',
          cursor: 'pointer'
        }
      }
    },
    MuiTable: {
      styleOverrides: {
        root: {
          borderSpacing: '0 5px'
        }
      }
    }
  }
});

const App: React.FC = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false
      }
    }
  });

  const authToken = useSelector((state: RootState) => state.auth.token);

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <CssBaseline />
          {authToken && <Header />}
          <Box sx={{ display: 'flex' }}>
            {authToken && <Sidebar />}
            <Box
              component='main'
              sx={{
                flexGrow: 1,
                p: 3,
                width: '80%',
                marginTop: '64px',
                backgroundColor: '#F3F3F3',
                height: 'calc(100vh - 64px)'
              }}
            >
              <Routes>
                <Route
                  path='/login'
                  element={authToken ? <Navigate to='/dashboard' /> : <LoginForm />}
                />
                <Route
                  path='/dashboard'
                  element={authToken ? <Dashboard /> : <Navigate to='/login' />}
                />
                <Route
                  path='/drivers'
                  element={authToken ? <Drivers /> : <Navigate to='/login' />}
                />
                <Route
                  path='/driver/:id'
                  element={authToken ? <DriverDetails /> : <Navigate to='/login' />}
                />
                <Route
                  path='/user'
                  element={authToken ? <User /> : <Navigate to='/login' />}
                />
                <Route
                  path='/fleet-management'
                  element={authToken ? <FleetManagement /> : <Navigate to='/login' />}
                />
                <Route
                  path='/import-data'
                  element={authToken ? <ImportData /> : <Navigate to='/login' />}
                />
                <Route
                  path='/financial-reports'
                  element={authToken ? <FinancialReports /> : <Navigate to='/login' />}
                />
                <Route
                  path='/'
                  element={<Navigate to={authToken ? '/dashboard' : '/login'} />}
                />
              </Routes>
            </Box>
          </Box>
        </Router>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
