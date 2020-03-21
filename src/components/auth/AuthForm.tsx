import React from 'react';
import styled from 'styled-components';
import media from '../../libs/styles/media';
import palette from '../../libs/styles/palette';
import { ProviderType } from './AuthButton';
import AuthEmailForm from './AuthEmailForm';
import AuthPhoneForm from './AuthPhoneForm';
import useInput from '../../libs/hooks/useInput';
import AuthEmailSuccess from './AuthEmailSuccess';
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
}
const AuthForm: React.FC<AuthFormProps> = ({ provider }) => {
  const [email, onChangeEmail] = useInput('');
  const [phone, onChangePhone] = useInput('');
  const registered = true;
  return (
    <AuthFormBlock>
      <div className="Upper_Wrapper">
        <h2>로그인</h2>
        <section>
          <h4>
            {provider === 'EMAIL' ? '이메일 서비스' : '문자 서비스'}로 로그인
          </h4>
          {provider === 'EMAIL' ? (
            <>
              {registered ? (
                <AuthEmailSuccess registered={registered} />
              ) : (
                <AuthEmailForm
                  email={email}
                  registered={registered}
                  onChange={onChangeEmail}
                />
              )}
            </>
          ) : (
            <>
              {registered ? (
                <AuthPhoneSuccess registered={registered} />
              ) : (
                <AuthPhoneForm
                  phone={phone}
                  registered={registered}
                  onChange={onChangePhone}
                />
              )}
            </>
          )}
        </section>
      </div>
    </AuthFormBlock>
  );
};

export default AuthForm;
