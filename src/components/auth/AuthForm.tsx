import React from 'react';
import styled from 'styled-components';
import media from '../../libs/styles/media';
import palette from '../../libs/styles/palette';
import { ProviderType } from './AuthButton';
import AuthEmailForm from './AuthEmailForm';
import AuthPhoneForm from './AuthPhoneForm';
import useInput from '../../libs/hooks/useInput';
import AuthSuccess from './AuthSuccess';
import AuthPhoneSuccess from './AuthPhoneSuccess';

const AuthFormBlock = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-between;
  line-height: 1.5;
  .Upper_Wrapper {
    ${media.small} {
      margin-top: 2rem;
    }
  }
  h2,
  h4 {
    margin: 0;
  }
  h2 {
    font-size: 1.3125rem;
    color: ${palette.gray8};
  }
  h4 {
    margin-top: 1rem;
    margin-bottom: 1rem;
    color: ${palette.gray6};
  }
  section + section {
    margin-top: 2.5rem;
  }
`;

interface AuthFormProps {
  provider: ProviderType;
  email_registered: boolean | null;
  sms_registered: boolean | null;

  email_loading: boolean;
  sms_loading: boolean;

  onSendAuthEmail: (email: string) => Promise<void>;
  onSendAuthSMS: (phone: string) => Promise<void>;
  onCertificationCode: (code: string) => Promise<void>;
}
const AuthForm: React.FC<AuthFormProps> = ({
  provider,
  email_registered,
  sms_registered,
  sms_loading,
  email_loading,
  onSendAuthEmail,
  onSendAuthSMS,
  onCertificationCode,
}) => {
  const [email, onChangeEmail] = useInput('');
  const [phone, onChangePhone] = useInput('');
  const [certification, onChangeCertification] = useInput('');

  const [select, setSelect] = React.useState('+82');
  const onChangeSelect = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelect(e.target.value);
    },
    [setSelect],
  );

  return (
    <AuthFormBlock>
      <div className="Upper_Wrapper">
        <h2>로그인</h2>
        <section>
          <h4>
            {provider === 'EMAIL' ? '이메일 서비스' : '문자 서비스'}로 로그인
          </h4>
          {provider === 'EMAIL' ? (
            <React.Fragment>
              {email_registered !== null ? (
                <AuthSuccess registered={email_registered} type="이메일" />
              ) : (
                <AuthEmailForm
                  email={email}
                  onChange={onChangeEmail}
                  onSubmit={onSendAuthEmail}
                  disabled={email_loading}
                />
              )}
            </React.Fragment>
          ) : (
            <React.Fragment>
              {sms_registered !== null ? (
                <React.Fragment>
                  <AuthPhoneSuccess
                    disabled={false}
                    certification={certification}
                    onChange={onChangeCertification}
                    onClick={onCertificationCode}
                  />
                </React.Fragment>
              ) : (
                <AuthPhoneForm
                  phone={phone}
                  select={select}
                  onChange={onChangePhone}
                  onSubmit={onSendAuthSMS}
                  disabled={sms_loading}
                  onChangeSelect={onChangeSelect}
                />
              )}
            </React.Fragment>
          )}
        </section>
      </div>
    </AuthFormBlock>
  );
};

export default AuthForm;
