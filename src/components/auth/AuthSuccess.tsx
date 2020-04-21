import React from 'react';
import styled from 'styled-components';
import { MdCheck as CheckIcon } from 'react-icons/md';
import palette from '../../libs/styles/palette';

const AuthSuccessBlock = styled.div`
  display: flex;
  align-items: center;
  background: ${palette.teal1};
  border: 1px solid ${palette.teal2};
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  height: 3rem;
  color: ${palette.teal7};
  .icon {
    font-size: 1.5rem;
  }
  .description {
    font-size: 0.875rem;
    flex: 1;
    text-align: center;
  }
`;

interface AuthSuccessProps {
  registerd: boolean;
  type: string;
}
const AuthSuccess: React.FC<AuthSuccessProps> = ({ registerd, type }) => {
  const text = registerd ? '로그인' : '회원가입';
  return (
    <AuthSuccessBlock>
      <CheckIcon className="icon" />
      <div className="description">
        {text} 링크가 {type}로 전송되었습니다.
      </div>
    </AuthSuccessBlock>
  );
};

export default AuthSuccess;
