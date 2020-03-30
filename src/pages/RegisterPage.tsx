import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import AuthTemplate from '../components/auth/AuthTemplate';
import RegisterFormContainer from '../containers/register/RegisterFormContainer';

interface RegisterPageProps extends RouteComponentProps {}
const RegisterPage: React.FC<RegisterPageProps> = ({ location, history }) => {
  return (
    <AuthTemplate>
      <RegisterFormContainer location={location} history={history} />
    </AuthTemplate>
  );
};

export default RegisterPage;
