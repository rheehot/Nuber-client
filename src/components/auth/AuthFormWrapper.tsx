import React from 'react';
import styled from 'styled-components';
import media from '../../libs/styles/media';
import palette from '../../libs/styles/palette';
import { ProviderType } from './AuthButton';

const AuthFormWrapperBlock = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  line-height: 1.5;
  .upper-wrapper {
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

interface AuthFormWrapperProps {
  provider: ProviderType;
}
const AuthFormWrapper: React.FC<AuthFormWrapperProps> = ({
  provider,
  children,
}) => {
  return (
    <AuthFormWrapperBlock>
      <div className="upper-wrapper">
        <h2>로그인</h2>
        <section>
          <h4>
            {provider === 'EMAIL' ? '이메일 서비스' : '문자 서비스'}로 로그인
          </h4>
          {children}
        </section>
      </div>
    </AuthFormWrapperBlock>
  );
};

export default AuthFormWrapper;
