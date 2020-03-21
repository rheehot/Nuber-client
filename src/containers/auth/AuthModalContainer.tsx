import React from 'react';
import AuthModal from '../../components/auth/AuthModal';
import { ProviderType } from '../../components/auth/AuthButton';
import { ModalState } from './LoginFormContainer';
import AuthForm from '../../components/auth/AuthForm';

interface AuthModalContainerProps {
  modal: ModalState;
  onModal: (provider: ProviderType, visible: boolean) => void;
}
const AuthModalContainer: React.FC<AuthModalContainerProps> = ({
  modal,
  onModal,
}) => {
  const { open, provider } = modal;
  return (
    <AuthModal visible={open} provider={provider} onModal={onModal}>
      <AuthForm provider={provider} />
    </AuthModal>
  );
};

export default AuthModalContainer;
