import React from 'react';
import styled from 'styled-components';
import Logo from '../base/Logo';
import { headerfannel } from '../../static/images';

const AuthTemplateBlock = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  .auth-header {
    height: 40px;
    background-size: 60px 60px;
    position: relative;
    background: url(${headerfannel}) center center repeat;
  }
  .auth-wrapper {
    flex: 1;
    width: 550px;
    position: relative;
    margin: 100px auto 0;
    padding: 12px;
    .form {
    }
  }
`;
interface AuthTemplateProps {}
const AuthTemplate: React.FC<AuthTemplateProps> = ({ children }) => {
  return (
    <AuthTemplateBlock className="AuthTemplate">
      <header className="auth-header">
        <Logo styles={styles} />
      </header>
      <section className="auth-wrapper">{children}</section>
    </AuthTemplateBlock>
  );
};

export default AuthTemplate;

const styles = `
  position: absolute;
  left: 46%;
  top: 20px;
`;
