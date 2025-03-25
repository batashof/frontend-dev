import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { AccountCircle } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';

import { User } from '../api/api.schemas';
import { logout } from '../store/slice/authSlice';
import CustomButton from './CustomButton';

const UserCard: React.FC<{ data: User | undefined }> = ({ data }) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  function createData(label: string, value: string | undefined | null) {
    return { value, label };
  }

  const rows = [
    createData('Name', data?.first_name),
    createData('Surname', data?.last_name),
    createData('Email', data?.email),
    createData('Role', data?.role),
    createData('Tenant', data?.tenant)
  ];
  return (
    <Box sx={{ padding: '16px' }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <IconButton
          size='large'
          aria-label='account of current user'
          aria-controls='menu-appbar'
          aria-haspopup='true'
          color='inherit'
        >
          <AccountCircle />
        </IconButton>
      </Box>
      <TableContainer sx={{ boxShadow: 'none' }}>
        <Table
          sx={{ boxShadow: 'none' }}
          size='small'
          aria-label='a dense table'
        >
          <TableBody>
            {rows.map(row => (
              <TableRow
                key={row.label}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell
                  component='th'
                  scope='row'
                >
                  {row.label}
                </TableCell>
                <TableCell align='right'>{row.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <CustomButton
        titleCustom='Request changes '
        sx={{ width: '100%' }}
        buttonType='submit'
      />
      <CustomButton
        titleCustom='Log out'
        sx={{ width: '100%' }}
        onClick={handleLogout}
        buttonType='outlined'
      />
    </Box>
  );
};
export default UserCard;
