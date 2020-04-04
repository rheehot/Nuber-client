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
  const [country_code, setCountryCode] = React.useState('+82');
  const [_sendAuthSMS, loading, data] = useRequest<SendAuthPayloadResponse>(
    sendAuthSMS,
  );

  const registered = data && data.registered;
  const onChangeSelect = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setCountryCode(e.target.value);
    },
    [setCountryCode],
  );

  const onSendAuthSMS = React.useCallback(
    async (sms: string, country_code: string) => {
      _sendAuthSMS(sms, country_code);
    },
    [_sendAuthSMS],
  );

  const [code, onCodeChange] = useInput('');
  const [cert_loading, setLoading] = React.useState(false);
  const onCertification = React.useCallback(() => {
    setLoading(true);
    if (!code) {
      setLoading(false);
      return;
    }

    if (registered) {
      history.push(`/code-login?code=${code}&type=phone`);
    } else {
      history.push(`/register?code=${code}&type=phone`);
    }
    setLoading(false);
  }, [code, registered]);

  return (
    <AuthFormWrapper provider="SMS">
      {registered !== null ? (
        <AuthCertification
          disabled={cert_loading}
          certification={code}
          onChange={onCodeChange}
          onClick={onCertification}
        />
      ) : (
        <AuthPhoneForm
          country_code={country_code}
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
