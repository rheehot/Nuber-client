import React from 'react';
import LoginTemplate from '../components/auth/LoginTemplate';
import LoginFormContainer from '../containers/auth/LoginFormContainer';
import { RouteComponentProps } from 'react-router-dom';

interface LoginPageProps extends RouteComponentProps {}
const LoginPage: React.FC<LoginPageProps> = () => {
  return (
    <LoginTemplate>
      <LoginFormContainer />
    </LoginTemplate>
  );
};

export default LoginPage;
