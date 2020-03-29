import React from 'react';
import AuthTemplate from '../components/auth/AuthTemplate';
import SMSLoginFormContainer from '../containers/auth/SMSLoginFormContainer';

interface SMSLoginPageProps {}
const SMSLoginPage: React.FC<SMSLoginPageProps> = () => {
  return (
    <AuthTemplate>
      <SMSLoginFormContainer />
    </AuthTemplate>
  );
};

export default SMSLoginPage;
