import React, { MouseEvent } from 'react';
import styled from 'styled-components';

import { MdEmail as EmailIcon } from 'react-icons/md';
import {
  FaFacebookSquare as FacebookIcon,
  FaSms as SMSIcon,
  FaComment as KakaoIcon,
} from 'react-icons/fa';

export type ProviderType = 'FACEBOOK' | 'KAKAO' | 'EMAIL' | 'SMS';

const AuthButtonBlock = styled.button`
  display: flex;
  width: 100%;
  height: 3rem;
  -webkit-box-pack: start;
  justify-content: flex-start;
  padding-left: 4.75rem;
  -webkit-box-align: center;
  align-items: center;
  font-size: 1rem;
  color: rgb(40, 42, 53);
  font-weight: 500;
  cursor: pointer;
  border-radius: 4px;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(224, 224, 224);
  border-image: initial;
  background: white;
  img {
    width: 24px;
    height: 24px;
    margin-right: 1rem;
  }
  svg {
    width: 24px;
    height: 24px;
    margin-right: 1rem;
  }

  & + & {
    margin-top: 1rem;
  }

  &:hover {
    background: rgb(245, 245, 245);
  }
`;

const providers = {
  FACEBOOK: {
    text: '페이스북으로 로그인',
    icon: FacebookIcon,
  },
  KAKAO: {
    text: '카카오로 로그인',
    icon: KakaoIcon,
  },
  EMAIL: {
    text: '이메일로 로그인',
    icon: EmailIcon,
  },
  SMS: {
    text: 'SMS로 로그인',
    icon: SMSIcon,
  },
};

interface AuthButtonProps {
  provider: ProviderType;
  onModal?: (provider: ProviderType, visible: boolean) => void;
  onSocialClick?: () => void;
}

const AuthButton: React.FC<AuthButtonProps> = ({
  provider,
  onModal,
  onSocialClick,
}) => {
  const { text, icon: Icon } = providers[provider];

  const onClick = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
      switch (provider) {
        case 'EMAIL':
        case 'SMS':
          onModal && onModal(provider, true);
          break;
        case 'KAKAO':
        case 'FACEBOOK':
          onSocialClick && onSocialClick();
          break;
        default:
          break;
      }
    },
    [onModal, onSocialClick],
  );

  return (
    <AuthButtonBlock onClick={onClick}>
      <Icon />
      <span>{text}</span>
    </AuthButtonBlock>
  );
};

export default AuthButton;
