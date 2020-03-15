import React from 'react';
import LoginTemplate from '../components/auth/LoginTemplate';
import LoginFormContainer from '../containers/auth/LoginFormContainer';
import { BrowserRouterProps } from 'react-router-dom';

interface LoginPageProps extends BrowserRouterProps {}
const LoginPage: React.FC<LoginPageProps> = () => {
  return (
    <LoginTemplate>
      <LoginFormContainer />
    </LoginTemplate>
  );
};

export default LoginPage;
