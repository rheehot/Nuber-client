import React from 'react';
import AuthModal from '../../components/auth/AuthModal';
import { ProviderType } from '../../components/auth/AuthButton';
import { ModalState } from './LoginFormContainer';
import AuthForm from '../../components/auth/AuthForm';
import useRequest from '../home/hooks/useRequest';
import {
  SendAuthPayloadResponse,
  sendAuthEmail,
  sendAuthSMS,
} from '../../libs/apis/auth';

interface AuthModalContainerProps {
  modal: ModalState;
  onModal: (provider: ProviderType, visible: boolean) => void;
}
const AuthModalContainer: React.FC<AuthModalContainerProps> = ({
  modal,
  onModal,
}) => {
  const { open, provider } = modal;
  const [_sendAuthEmail, emal_loading, email_data] = useRequest<
    SendAuthPayloadResponse
  >(sendAuthEmail);

  const [_sendAuthSMS, sms_loading, sms_data] = useRequest<
    SendAuthPayloadResponse
  >(sendAuthSMS);

  const email_registered = email_data && email_data.registered;
  const sms_registered = sms_data && sms_data.registered;

  const onSendAuthEmail = React.useCallback(
    async (email: string) => {
      _sendAuthEmail(email);
    },
    [_sendAuthEmail],
  );

  const onSendAuthSMS = React.useCallback(
    async (phone: string) => {
      _sendAuthSMS(phone);
    },
    [_sendAuthEmail],
  );

  return (
    <AuthModal visible={open} provider={provider} onModal={onModal}>
      <AuthForm
        provider={provider}
        email_registered={email_registered!}
        sms_registered={sms_registered!}
        email_loading={emal_loading}
        sms_loading={sms_loading}
        onSendAuthEmail={onSendAuthEmail}
        onSendAuthSMS={onSendAuthSMS}
      />
    </AuthModal>
  );
};

export default AuthModalContainer;
