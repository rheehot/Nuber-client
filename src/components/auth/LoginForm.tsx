import React from 'react';
import styled from 'styled-components';
import palette from '../../libs/styles/palette';
import media from '../../libs/styles/media';
import Logo from '../base/Logo';
import AuthButton, { ProviderType } from './AuthButton';

const LoginFormBlock = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  line-height: 1.5;
  margin: 10rem 0 10rem 0;
  ${media.small} {
    margin: 2rem 0 2rem 0;
  }
  .Upper_Wrapper {
    margin: 0 auto;
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
  section {
    width: 312px;
  }

  section + section {
    margin-top: 1rem;
  }
`;

interface LoginFormProps {
  onModal: (provider: ProviderType, visible: boolean) => void;
}
const LoginForm: React.FC<LoginFormProps> = ({ onModal }) => {
  return (
    <LoginFormBlock className="LoginForm">
      <div className="Upper_Wrapper">
        <h2 data-testid="Title">
          <Logo />
        </h2>
        <section>
          <h4>Email</h4>
          <AuthButton provider="EMAIL" onModal={onModal} />
        </section>
        <section>
          <h4>SMS</h4>
          <AuthButton provider="SMS" onModal={onModal} />
        </section>
        <section>
          <h4>SNS</h4>
          <AuthButton provider="KAKAO" />
          <AuthButton provider="FACEBOOK" />
        </section>
      </div>
    </LoginFormBlock>
  );
};

export default LoginForm;
