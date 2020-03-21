import React from 'react';
import styled, { css } from 'styled-components';
import { MdClose as CloseIcon } from 'react-icons/md';
import zIndexes from '../../libs/styles/zIndexes';
import media from '../../libs/styles/media';
import palette from '../../libs/styles/palette';
import transitions from '../../libs/styles/transitions';
import { ProviderType } from './AuthButton';

const AuthModalBlcok = styled.div<{ visible: boolean }>`
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
    width: 400px;
    height: 500px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.09);
    display: flex;
    ${media.small} {
      flex: 1;
      width: auto;
      height: 100%;
    }

    ${props =>
      props.visible
        ? css`
            animation: ${transitions.popInFromBottom} 0.4s forwards ease-in-out;
          `
        : css`
            animation: ${transitions.popOutToBottom} 0.2s forwards ease-in-out;
          `}
    .Block {
      background: white;
      padding: 1.5rem;
      display: flex;
      width: 100%;
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

interface AuthModalProps {
  visible: boolean;
  provider: ProviderType;
  onModal: (provider: ProviderType, visible: boolean) => void;
}
const AuthModal: React.FC<AuthModalProps> = ({
  children,
  visible,
  provider,
  onModal,
}) => {
  const [closed, setClosed] = React.useState(true);
  React.useEffect(() => {
    let timeoutId: number | null = null;
    if (visible) {
      setClosed(false);
    } else {
      timeoutId = setTimeout(() => {
        setClosed(true);
      }, 200) as any;
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  if (!visible && closed) return null;
  return (
    <AuthModalBlcok className="AuthModal" visible={visible}>
      <div className="Wrapper">
        <div className="Block">
          <div className="Exit_Wrapper">
            <CloseIcon tabIndex={1} onClick={() => onModal(provider, false)} />
          </div>
          <div className="Block_Content">{children}</div>
        </div>
      </div>
    </AuthModalBlcok>
  );
};

export default AuthModal;
