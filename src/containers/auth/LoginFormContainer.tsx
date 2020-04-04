import React from 'react';
import { useHistory } from 'react-router-dom';
import LoginForm from '../../components/auth/LoginForm';
import { ProviderType } from '../../components/auth/AuthButton';

export type ModalState = {
  open: boolean;
  provider: ProviderType;
};

interface LoginFormContainerProps {}
const LoginFormContainer: React.FC<LoginFormContainerProps> = () => {
  const history = useHistory();
  const onGoMove = React.useCallback((provider: ProviderType) => {
    switch (provider) {
      case 'EMAIL':
        history.push('/email');
        break;
      case 'SMS':
        history.push('/sms');
        break;
      default:
        break;
    }
  }, []);

  const onSocialLogin = React.useCallback(() => {
    const redirectTo = `http://localhost:4000/api/v1.0/auth/social/redirect/kakao`;
    window.location.replace(redirectTo);
  }, []);

  return <LoginForm onGoMove={onGoMove} onSocialLogin={onSocialLogin} />;
};

export default LoginFormContainer;
