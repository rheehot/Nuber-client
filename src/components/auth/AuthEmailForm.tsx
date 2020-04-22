import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import palette from '../../libs/styles/palette';

const AuthEmailFormWrapper = styled.div`
  .signup-link {
    display: block;
    font-size: 0.85714rem;
    margin-bottom: 24px;
    margin-top: 24px;
    & > p {
      display: inline;
      letter-spacing: 0.005em;
      a {
        margin-left: 0.25rem;
        margin-right: 0.25rem;
        color: ${palette.gray6};
        text-decoration: none;
        cursor: pointer;
      }
    }
  }
`;

const AuthEmailFormBlock = styled.form`
  width: 100%;
  display: flex;
  height: 3rem;
  input {
    flex: 1;
    border-top-left-radius: 2px;
    border-bottom-left-radius: 2px;
    padding: 1rem;
    font-size: 1rem;
    border: 1px solid ${palette.gray3};
    border-right: none;
    &::placeholder {
      color: ${palette.gray6};
    }
    &:disabled {
      background: ${palette.gray1};
    }
  }
  button {
    padding: 8px;
    background: ${palette.gray8};
    color: white;
    font-size: 1rem;
    font-weight: bold;
    outline: none;
    border: none;
    border-top-right-radius: 2px;
    border-bottom-right-radius: 2px;
    width: 6rem;
    text-align: center;
    word-break: keep-all;
    cursor: pointer;
    &:hover,
    &:focus {
      background: ${palette.gray6};
    }
    &:disabled {
      background: ${palette.gray6};
      color: ${palette.gray3};
      cursor: default;
    }
  }
`;

interface AuthEmailFormProps {
  email: string;
  disabled: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (email: string) => Promise<void>;
}
const AuthEmailForm: React.FC<AuthEmailFormProps> = ({
  email,
  disabled,
  onChange,
  onSubmit,
}) => {
  return (
    <AuthEmailFormWrapper>
      <AuthEmailFormBlock
        onSubmit={e => {
          e.preventDefault();
          onSubmit(email);
        }}
      >
        <input
          value={email}
          tabIndex={2}
          placeholder="이메일을 입력하세요."
          disabled={disabled}
          onChange={onChange}
        />
        <button tabIndex={3} disabled={disabled}>
          인증하기
        </button>
      </AuthEmailFormBlock>
      <div className="signup-link">
        <p>
          SMS로 로그인하시겠습니까?
          <Link to="/sms">SMS로 로그인</Link>
        </p>
      </div>
    </AuthEmailFormWrapper>
  );
};

export default AuthEmailForm;
