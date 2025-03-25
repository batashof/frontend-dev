import React from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { ArrowForward } from '@mui/icons-material';
import { Breadcrumbs as MuiBreadcrumbs, Typography } from '@mui/material';

const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const CustomBreadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  return (
    <MuiBreadcrumbs
      separator={<ArrowForward fontSize='small' />}
      aria-label='breadcrumb'
      sx={{ mb: 2, backgroundColor: 'white', borderRadius: '20px', padding: '12px 24px' }}
    >
      <Link
        to='/'
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        Home
      </Link>
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;

        return isLast ? (
          <Typography
            key={name}
            color='text.primary'
          >
            {capitalize(name)}
          </Typography>
        ) : (
          <Link
            key={name}
            to={routeTo}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            {capitalize(name)}
          </Link>
        );
      })}
    </MuiBreadcrumbs>
  );
};

export default CustomBreadcrumbs;
