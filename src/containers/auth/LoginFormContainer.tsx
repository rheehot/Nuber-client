import React from 'react';
import AuthModalContainer from './AuthModalContainer';
import LoginForm from '../../components/auth/LoginForm';
import { ProviderType } from '../../components/auth/AuthButton';

export type ModalState = {
  open: boolean;
  provider: ProviderType;
};

interface LoginFormContainerProps {}
const LoginFormContainer: React.FC<LoginFormContainerProps> = () => {
  const [modal, setModal] = React.useState<ModalState>({
    open: false,
    provider: 'EMAIL',
  });

  const onModal = React.useCallback(
    (provider: ProviderType, visible: boolean) => {
      console.log(provider);
      setModal({
        provider,
        open: visible,
      });
    },
    [setModal],
  );

  return (
    <React.Fragment>
      <LoginForm onModal={onModal} />
      <AuthModalContainer modal={modal} onModal={onModal} />
    </React.Fragment>
  );
};

export default LoginFormContainer;
