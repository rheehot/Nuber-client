import React from 'react';
import styled from 'styled-components';
import { MdClose as CloseIcon } from 'react-icons/md';
import zIndexes from '../../libs/styles/zIndexes';
import media from '../../libs/styles/media';
import palette from '../../libs/styles/palette';

const AuthModalBlcok = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: ${zIndexes.AuthModal};
  .Wrapper {
    width: 606px;
    height: 480px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.09);
    display: flex;
    ${media.small} {
      flex: 1;
      width: auto;
      height: 100%;
    }
    .Block {
      background: white;
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      ${media.small} {
        overflow-y: auto;
      }
      .Exit_Wrapper {
        display: flex;
        justify-content: flex-end;
        font-size: 1.5rem;
        color: ${palette.gray6};
        margin-bottom: 2.25rem;
        svg {
          cursor: pointer;
        }
        ${media.small} {
          margin-bottom: 0;
        }
      }
      .Block_Content {
        flex: 1;
        display: flex;
        flex-direction: column;
      }
    }
  }
`;

interface AuthModalProps {}
const AuthModal: React.FC<AuthModalProps> = ({ children }) => {
  return (
    <AuthModalBlcok className="AuthModal">
      <div className="Wrapper">
        <div className="Block">
          <div className="Exit_Wrapper">
            <CloseIcon tabIndex={1} />
          </div>
          <div className="Block_Content">{children}</div>
        </div>
      </div>
    </AuthModalBlcok>
  );
};

export default AuthModal;
