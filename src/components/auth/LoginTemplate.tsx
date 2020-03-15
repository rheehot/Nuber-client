import React from 'react';
import styled from 'styled-components';
import palette from '../../libs/styles/palette';

import { undrawQuiteTown } from '../../static/images';
import media from '../../libs/styles/media';

const LoginTemplateBlock = styled.div`
  display: flex;
  flex: 1;
  width: auto;
  height: 100%;
  .Gray_Block {
    ${media.small} {
      display: none;
    }
    width: 700px;
    background: ${palette.gray1};
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      width: 100%;
      height: auto;
      display: block;
    }
    .Welcome {
      font-size: 1.75rem;
      margin-top: 1.5rem;
      color: ${palette.gray7};
      text-align: center;
      font-weight: 600;
    }
  }
  .White_Block {
    flex: 1;
    background: white;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    ${media.small} {
      overflow-y: auto;
    }
    .Block_Content {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
  }
`;

interface LoginTemplateProps {}
const LoginTemplate: React.FC<LoginTemplateProps> = ({ children }) => {
  return (
    <LoginTemplateBlock className="LoginTemplate">
      <div className="Gray_Block">
        <div>
          <img src={undrawQuiteTown} alt="welcome" />
          <div className="Welcome">환영합니다!</div>
        </div>
      </div>
      <div className="White_Block">
        <div className="Block_Content">{children}</div>
      </div>
    </LoginTemplateBlock>
  );
};

export default LoginTemplate;
