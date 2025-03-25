import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Box, Button, Checkbox, Container, Link, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useV1AuthSignInCreate } from 'api/auth/auth';
import { login } from 'store/slice/authSlice';

const FormContainer = styled(Container)({
  position: 'absolute',
  width: '100vw',
  height: '100vh',
  top: 0,
  left: 0,
  background: '#FFFFFF',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '70px'
});

const ImageBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column'
});

const FormBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '33.6px'
});

const StyledTextField = styled(TextField)({
  width: '100%',
  '& .MuiOutlinedInput-root': {
    borderRadius: '4.8px',
    fontSize: '19.2px'
  },
  '& .MuiInputLabel-root': {
    fontSize: '19.2px'
  }
});

const StyledButton = styled(Button)({
  width: '100%',
  height: '63.6px',
  background: '#FFD858',
  borderRadius: '4.8px',
  fontWeight: 600,
  fontSize: '16.8px',
  color: '#000000',
  '&:hover': {
    background: '#FFD858'
  }
});

const StyledCheckbox = styled(Checkbox)({
  width: '21.6px',
  height: '21.6px',
  border: '2.4px solid #000000',
  borderRadius: '2.4px'
});

const CheckboxText = styled(Typography)({
  fontWeight: 400,
  fontSize: '18px',
  lineHeight: '29px',
  letterSpacing: '0.6px',
  color: '#000000'
});

const WelcomeTitle = styled(Typography)({
  fontWeight: 600,
  fontSize: '54px',
  lineHeight: '62px',
  color: '#000000'
});

const LoginSubtitle = styled(Typography)({
  fontWeight: 500,
  fontSize: '28.8px',
  lineHeight: '48px',
  color: 'rgba(48, 48, 48, 0.5)'
});

const SignupLink = styled(Link)({
  fontWeight: 400,
  fontSize: '19.2px',
  lineHeight: '29px',
  letterSpacing: '0.6px',
  textDecoration: 'underline',
  color: '#000000',
  marginTop: '16px'
});

const ErrorMessage = styled(Typography)({
  color: 'error',
  marginTop: '16px'
});

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { mutateAsync: signIn } = useV1AuthSignInCreate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const data: any = await signIn({
        data: {
          email,
          password
        }
      });
      dispatch(login(data?.access));
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <FormContainer maxWidth={false}>
      <ImageBox>
        <img
          src='/img/big-logo.svg'
          alt='logo'
          width='329px'
        />
        <img
          src='/img/login-img.png'
          alt='login'
          style={{ marginTop: '60px' }}
        />
      </ImageBox>
      <FormBox>
        <WelcomeTitle variant='h1'>Welcome!</WelcomeTitle>
        <LoginSubtitle variant='body1'>Log in to get started</LoginSubtitle>
        <form onSubmit={handleSubmit}>
          <StyledTextField
            label='Email'
            fullWidth
            margin='normal'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <StyledTextField
            label='Password'
            type='password'
            fullWidth
            margin='normal'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '14.4px', mt: 2 }}>
            <StyledCheckbox />
            <CheckboxText>I agree Terms of Service and Privacy Policy</CheckboxText>
          </Box>
          <StyledButton
            type='submit'
            variant='contained'
            sx={{ mt: 2 }}
          >
            Login in
          </StyledButton>
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </form>
        <SignupLink href='/signup'>I don&apos;t have an account</SignupLink>
      </FormBox>
    </FormContainer>
  );
};

export default LoginForm;
