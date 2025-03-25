import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { AccountCircle, Commute as CommuteIcon } from '@mui/icons-material';
import {
  AppBar,
  Box,
  FormControl,
  IconButton,
  Menu,
  MenuItem,
  Select,
  Toolbar,
  Typography
} from '@mui/material';

import { useV1UsersCurrentRetrieve } from '../api/users/users';
import UserCard from './UserCard';

const Header: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { t, i18n } = useTranslation();

  const { data } = useV1UsersCurrentRetrieve();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  return (
    <AppBar
      position='fixed'
      sx={{ backgroundColor: '#FFFFFF', boxShadow: 'none', color: 'black' }}
    >
      <Toolbar>
        <Box sx={{ marginLeft: '235px', flexGrow: 1, display: 'flex' }}>
          <CommuteIcon />
          <Typography>{t('header.title')}:Park №1</Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {/*<Box*/}
          {/*  sx={{*/}
          {/*    position: 'relative',*/}
          {/*    borderRadius: '4px',*/}
          {/*    backgroundColor: 'rgba(255, 255, 255, 0.15)'*/}
          {/*  }}*/}
          {/*>*/}
          {/*  <IconButton sx={{ padding: '10px' }}>*/}
          {/*    <SearchIcon />*/}
          {/*  </IconButton>*/}
          {/*  <InputBase*/}
          {/*    placeholder={t('header.search')}*/}
          {/*    sx={{ color: 'inherit', paddingLeft: '40px' }}*/}
          {/*    inputProps={{ 'aria-label': 'search' }}*/}
          {/*  />*/}
          {/*</Box>*/}
          <FormControl
            sx={{ m: 1, minWidth: 120 }}
            size='small'
          >
            <Select
              value={i18n.language}
              onChange={e => changeLanguage(e.target.value as string)}
              sx={{ color: 'white' }}
            >
              <MenuItem value='en'>English</MenuItem>
              <MenuItem value='ru'>Русский</MenuItem>
              <MenuItem value='pl'>Polski</MenuItem>
            </Select>
          </FormControl>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleMenu}
              color='inherit'
            >
              <AccountCircle />
            </IconButton>
            <Typography>{data?.full_name}</Typography>
          </Box>

          <Menu
            id='menu-appbar'
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            slotProps={{
              paper: {
                sx: {
                  borderRadius: '20px'
                }
              }
            }}
          >
            <UserCard data={data} />
            {/*<MenuItem onClick={handleClose}>{t('header.profile')}</MenuItem>*/}
            {/*<MenuItem onClick={handleLogout}>{t('header.logout')}</MenuItem>*/}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
