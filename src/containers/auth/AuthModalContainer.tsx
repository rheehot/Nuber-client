import React from 'react';
import AuthModal from '../../components/auth/AuthModal';
import { ModalState } from './LoginFormContainer';

interface AuthModalContainerProps {
  modal: ModalState;
}
const AuthModalContainer: React.FC<AuthModalContainerProps> = ({ modal }) => {
  if (!modal.open) return null;
  return <AuthModal />;
};

export default AuthModalContainer;
