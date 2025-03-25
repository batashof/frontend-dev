import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { AddCircleOutline, AttachFile } from '@mui/icons-material';
import { Box, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { DriverDetails as DriverDetailsType } from '../api/api.schemas';
import { useV1DriversRetrieve } from '../api/drivers/drivers';
import ControlledDatePicker from '../components/ControlledDatePicker';
import ControlledTextField from '../components/ControlledTextField';
import CustomBreadcrumbs from '../components/CustomBreadcrumbs';
import CustomButton from '../components/CustomButton';
import FormContainer from '../components/FormContainer';

const DriverDetails: React.FC = () => {
  const { id } = useParams();
  const { data } = useV1DriversRetrieve(id || '');

  const methods = useForm<DriverDetailsType>({
    defaultValues: {
      uuid: data?.uuid || '',
      first_name: data?.first_name || '',
      last_name: data?.last_name || '',
      date_of_birth: data?.date_of_birth || '',
      address: data?.address || '',
      passport_number: data?.passport_number || '',
      pesel: data?.pesel || '',
      email: data?.email || '',
      work_permit_expiry: data?.work_permit_expiry || '',
      phone: data?.phone || '',
      bank_account: data?.bank_account || '',
      vat: data?.vat || '',
      zus_monthly: data?.zus_monthly || '',
      zus_weekly: data?.zus_weekly || '',
      additional_info: data?.additional_info || ''
    }
  });

  useEffect(() => {
    methods.reset(data);
  }, [data, methods]);

  const onSubmit = (data: DriverDetailsType) => {
    console.log(data);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <Typography sx={{ fontSize: '32px', fontWeight: 600 }}>
          Driver card: {data?.first_name} {data?.last_name}
        </Typography>
        <Box sx={{ display: 'flex', gap: 3 }}>
          <CustomButton
            titleCustom='Delete the driver and his details'
            buttonType='error'
          />
          <CustomButton
            titleCustom='Save'
            buttonType='submit'
            onClick={methods.handleSubmit(onSubmit)}
          />
        </Box>
      </Box>
      <CustomBreadcrumbs />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <FormProvider {...methods}>
          <Grid
            container
            spacing={3}
          >
            <Grid size={4}>
              <FormContainer title='Personal Information'>
                <Grid
                  container
                  spacing={3}
                >
                  <Grid size={12}>
                    <ControlledTextField
                      name='uuid'
                      label='The unique identifier of the driver:'
                    />
                  </Grid>
                  <Grid size={6}>
                    <ControlledTextField
                      name='first_name'
                      label='First Name'
                    />
                  </Grid>
                  <Grid size={6}>
                    <ControlledTextField
                      name='last_name'
                      label='Last Name'
                    />
                  </Grid>
                  <Grid size={6}>
                    <ControlledDatePicker
                      name='date_of_birth'
                      label='Birthday'
                    />
                  </Grid>
                  <Grid size={6}>
                    <ControlledDatePicker
                      name='date_of_birth'
                      label='Date of dismissal'
                    />
                  </Grid>
                  <Grid size={12}>
                    <ControlledTextField
                      name='address'
                      label='Residential Address'
                    />
                  </Grid>
                  <Grid size={6}>
                    <ControlledTextField
                      name='passport_number'
                      label='Passport Number'
                    />
                  </Grid>
                  <Grid size={6}>
                    <ControlledTextField
                      name='pesel'
                      label='PESEL'
                    />
                  </Grid>
                  <Grid size={12}>
                    <ControlledTextField
                      name='email'
                      label='Email'
                    />
                  </Grid>
                  <Grid size={6}>
                    <ControlledDatePicker
                      name='work_permit_expiry'
                      label='Work Permit Expiry'
                    />
                  </Grid>
                  <Grid size={6}>
                    <ControlledTextField
                      name='phone'
                      label='Phone'
                    />
                  </Grid>
                </Grid>
              </FormContainer>
            </Grid>
            <Grid size={4}>
              <Stack spacing={3}>
                <FormContainer title='Financial data and taxes'>
                  <Grid
                    container
                    spacing={3}
                  >
                    <Grid size={9}>
                      <ControlledTextField
                        name='bank_account'
                        label='Bank Account Number'
                      />
                    </Grid>
                    <Grid size={3}>
                      <ControlledTextField
                        name='vat'
                        label='Vat %'
                      />
                    </Grid>
                    <Grid size={6}>
                      <ControlledTextField
                        name='weeklyAmount'
                        label='ZUS amount per week'
                      />
                    </Grid>
                    <Grid size={6}>
                      <ControlledTextField
                        name='monthlyAmount'
                        label='ZUS amount per mounth'
                      />
                    </Grid>
                    <Grid size={12}>
                      <ControlledTextField
                        name='additional_info'
                        multiline
                        rows={4}
                        label='More info'
                      />
                    </Grid>
                  </Grid>
                </FormContainer>
                <FormContainer title='Financial data and taxes'></FormContainer>
              </Stack>
            </Grid>
            <Grid size={4}>
              <Stack spacing={3}>
                <FormContainer title='Files'>
                  <CustomButton
                    endIcon={<AttachFile fontSize='small' />}
                    titleCustom='Add a file'
                    sx={{ width: '100%' }}
                    buttonType='cancel'
                  />
                </FormContainer>
                <FormContainer title='Petrol cards'>
                  <CustomButton
                    endIcon={<AddCircleOutline fontSize='small' />}
                    titleCustom='Add a card'
                    sx={{ width: '100%' }}
                    buttonType='cancel'
                  />
                </FormContainer>
              </Stack>
            </Grid>
          </Grid>
        </FormProvider>
      </LocalizationProvider>
    </Box>
  );
};

export default DriverDetails;
