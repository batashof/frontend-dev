import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  BarChart as BarChartIcon,
  CloudUpload as CloudUploadIcon,
  Dashboard as DashboardIcon,
  DirectionsCar as DirectionsCarIcon,
  Help as HelpIcon,
  Info as InfoIcon,
  Menu as MenuIcon,
  People as PeopleIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';
import { Box, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { styled } from '@mui/material/styles';

import SidebarItem from './SidebarItem';

const StyledDrawer = styled(Drawer, {
  shouldForwardProp: prop => prop !== 'isCollapsed'
})<{ isCollapsed: boolean }>(({ isCollapsed }) => ({
  width: isCollapsed ? 64 : 235,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: isCollapsed ? 64 : 235,
    boxSizing: 'border-box',
    overflowX: 'hidden',
    transition: 'width 0.3s ease',
    border: 'none'
  }
}));

const StyledLogoBox = styled(Box)({
  display: 'flex',
  flexGrow: 1,
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '30px',
  padding: 16
});

const StyledIconButton = styled(IconButton)({
  alignSelf: 'flex-start'
});

const StyledList = styled(List)({
  width: '100%'
});

const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { t } = useTranslation();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <StyledDrawer
      variant='permanent'
      open={!isCollapsed}
      isCollapsed={isCollapsed}
    >
      <img
        src='/img/logo.svg'
        alt='logo'
        width='129px'
        style={{ marginTop: '20px', marginLeft: '30px' }}
      />
      <StyledLogoBox>
        <StyledIconButton onClick={toggleSidebar}>
          <MenuIcon />
        </StyledIconButton>
        <StyledList>
          <SidebarItem
            icon={<DashboardIcon />}
            text={t('sidebar.dashboard')}
            path='/dashboard'
            subItems={[
              {
                text: 'Finances',
                path: '/dashboard/finances'
              },
              {
                text: 'Alerts',
                path: '/dashboard/alerts'
              }
            ]}
          />
          <SidebarItem
            icon={<PeopleIcon />}
            text={t('sidebar.drivers')}
            path='/drivers'
          />
          <SidebarItem
            icon={<DirectionsCarIcon />}
            text={t('sidebar.fleetManagement')}
            path='/fleet-management'
          />
          <SidebarItem
            icon={<CloudUploadIcon />}
            text={t('sidebar.importData')}
            path='/import-data'
          />
          <SidebarItem
            icon={<BarChartIcon />}
            text={t('sidebar.financialReports')}
            path='/financial-reports'
          />
        </StyledList>
      </StyledLogoBox>
      <Box sx={{ p: 2 }}>
        <List>
          <ListItem>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            {!isCollapsed && <ListItemText primary='Settings' />}
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <HelpIcon />
            </ListItemIcon>
            {!isCollapsed && <ListItemText primary='Help Center' />}
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            {!isCollapsed && <ListItemText primary='Version 1.0.0' />}
          </ListItem>
        </List>
      </Box>
    </StyledDrawer>
  );
};

export default Sidebar;
