import React from 'react';
import styled from 'styled-components';
import Logo from '../base/Logo';
import { headerfannel } from '../../static/images';
import media from '../../libs/styles/media';

const AuthTemplateBlock = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  .auth-header {
    height: 40px;
    background-size: 60px 60px;
    position: relative;
    background: url(${headerfannel}) center center repeat;
    ${media.small} {
      height: 44px;
      & > .Logo {
        position: relative;
        height: 44px;
        width: 100%;
        margin-left: 0;
        left: 0;
        top: 0;
      }
    }
  }
  .auth-wrapper {
    flex: 1;
    width: 550px;
    position: relative;
    margin: 100px auto 0;
    padding: 12px;
    ${media.small} {
      width: 100%;
      margin-top: 0;
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
