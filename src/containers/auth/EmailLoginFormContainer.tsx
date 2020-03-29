import React from 'react';
import AuthFormWrapper from '../../components/auth/AuthFormWrapper';
import AuthSuccess from '../../components/auth/AuthSuccess';
import AuthEmailForm from '../../components/auth/AuthEmailForm';
import useInput from '../../libs/hooks/useInput';
import useRequest from '../../libs/hooks/useRequest';
import { sendAuthEmail, SendAuthPayloadResponse } from '../../libs/apis/auth';

interface EmailLoginFormContainerProps {}
const EmailLoginFormContainer: React.FC<EmailLoginFormContainerProps> = () => {
  const [email, onChangeInput] = useInput('');
  const [_sendAuthEmail, loading, data] = useRequest<SendAuthPayloadResponse>(
    sendAuthEmail,
  );

  const registered = data ? data.registered : null;
  const onSendAuthEmail = React.useCallback(
    async (email: string) => {
      _sendAuthEmail(email);
    },
    [_sendAuthEmail],
  );

  return (
    <AuthFormWrapper provider="EMAIL">
      <Form
        registerd={registered}
        loading={loading}
        email={email}
        onChange={onChangeInput}
        onSubmit={onSendAuthEmail}
      />
    </AuthFormWrapper>
  );
};

interface FormProps {
  email: string;
  registerd: boolean | null;
  loading: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (email: string) => Promise<void>;
}
const Form: React.FC<FormProps> = ({
  registerd,
  loading,
  email,
  onChange,
  onSubmit,
}) => {
  return (
    <React.Fragment>
      {registerd !== null ? (
        <AuthSuccess registered={registerd} type="이메일" />
      ) : (
        <AuthEmailForm
          email={email}
          onChange={onChange}
          onSubmit={onSubmit}
          disabled={loading}
        />
      )}
    </React.Fragment>
  );
};

export default EmailLoginFormContainer;
