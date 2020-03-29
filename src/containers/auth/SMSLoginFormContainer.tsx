import React from 'react';
import { useHistory } from 'react-router-dom';
import AuthPhoneForm from '../../components/auth/AuthPhoneForm';
import AuthCertification from '../../components/auth/AuthCertification';
import AuthFormWrapper from '../../components/auth/AuthFormWrapper';
import useInput from '../../libs/hooks/useInput';
import useRequest from '../../libs/hooks/useRequest';
import { SendAuthPayloadResponse, sendAuthSMS } from '../../libs/apis/auth';

interface SMSLoginFormContainerProps {}
const SMSLoginFormContainer: React.FC<SMSLoginFormContainerProps> = () => {
  const history = useHistory();

  const [sms, onChangeSMS] = useInput('');
  const [select, setSelect] = React.useState('+82');
  const [_sendAuthSMS, loading, data] = useRequest<SendAuthPayloadResponse>(
    sendAuthSMS,
  );

  const registered = data ? data.registered : null;

  const onChangeSelect = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelect(e.target.value);
    },
    [setSelect],
  );
  const onSendAuthSMS = React.useCallback(
    async (sms: string) => {
      _sendAuthSMS(sms);
    },
    [_sendAuthSMS],
  );

  const [certification, onChangeCertification] = useInput('');
  const [cert_loading, setLoading] = React.useState(false);
  const onCertification = React.useCallback(() => {
    setLoading(true);
    if (!certification) {
      setLoading(false);
      return;
    }

    history.push(`/code/${certification}`);
    setLoading(false);
  }, [certification]);

  return (
    <AuthFormWrapper provider="SMS">
      {registered != null ? (
        <AuthCertification
          disabled={cert_loading}
          certification={certification}
          onChange={onChangeCertification}
          onClick={onCertification}
        />
      ) : (
        <AuthPhoneForm
          select={select}
          phone={sms}
          onChange={onChangeSMS}
          onChangeSelect={onChangeSelect}
          onSubmit={onSendAuthSMS}
          disabled={loading}
        />
      )}
    </AuthFormWrapper>
  );
};

export default SMSLoginFormContainer;
