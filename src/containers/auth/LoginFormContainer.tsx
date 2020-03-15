import React from 'react';
import LoginForm from '../../components/auth/LoginForm';
import { ProviderType } from '../../components/auth/AuthButton';

type ModalState = {
  open: boolean;
  provider: ProviderType;
};

interface LoginFormContainerProps {}
const LoginFormContainer: React.FC<LoginFormContainerProps> = () => {
  const [modal, setModal] = React.useState<ModalState>({
    open: false,
    provider: 'EMAIL',
  });

  const onOpenModal = React.useCallback(
    (provider: ProviderType) => {
      console.log(provider);
      setModal({
        provider,
        open: true,
      });
    },
    [setModal],
  );

  const onCloseModal = React.useCallback(
    (provider: ProviderType) => {
      setModal({
        provider,
        open: false,
      });
    },
    [setModal],
  );

  return (
    <React.Fragment>
      <LoginForm onModalClick={onOpenModal} />
    </React.Fragment>
  );
};

export default LoginFormContainer;
