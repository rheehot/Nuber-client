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

  const onModalClick = React.useCallback(
    (provider: ProviderType) => {
      console.log(provider);
      setModal({
        provider,
        open: !modal.open,
      });
    },
    [modal.open, setModal],
  );

  return (
    <React.Fragment>
      <LoginForm onModalClick={onModalClick} />
      <AuthModalContainer modal={modal} />
    </React.Fragment>
  );
};

export default LoginFormContainer;
