import React from 'react';
import AuthTemplate from '../components/auth/AuthTemplate';
import EmailLoginFormContainer from '../containers/auth/EmailLoginFormContainer';

interface EmailLoginPageProps {}
const EmailLoginPage: React.FC<EmailLoginPageProps> = () => {
  return (
    <AuthTemplate>
      <EmailLoginFormContainer />
    </AuthTemplate>
  );
};

export default EmailLoginPage;
