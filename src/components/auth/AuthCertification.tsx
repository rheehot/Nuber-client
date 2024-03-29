import React from 'react';
import styled from 'styled-components';
import palette from '../../libs/styles/palette';

const AuthCertificationBlock = styled.div`
  .Input_Wrapper {
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
  }
`;

interface AuthCertificationProps {
  disabled: boolean;
  certification: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: (code: string) => void;
}
const AuthCertification: React.FC<AuthCertificationProps> = ({
  disabled,
  certification,
  onChange,
  onClick,
}) => {
  return (
    <AuthCertificationBlock>
      <div className="Input_Wrapper">
        <input
          placeholder="인증코드를 입력하세요"
          value={certification}
          tabIndex={2}
          onChange={onChange}
          disabled={disabled}
        />
        <button
          tabIndex={3}
          disabled={disabled}
          onClick={() => onClick(certification)}
        >
          인증하기
        </button>
      </div>
    </AuthCertificationBlock>
  );
};

export default AuthCertification;
