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
        history.push('/email-login');
        break;
      case 'SMS':
        history.push('/sms-login');
        break;
      default:
        break;
    }
  }, []);

  return <LoginForm onGoMove={onGoMove} />;
};

export default LoginFormContainer;
