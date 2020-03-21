import React from 'react';
import styled from 'styled-components';
import { undrawSmallTown } from '../../static/images';
import palette from '../../libs/styles/palette';

const AuthPhoneSuccessBlock = styled.div`
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

  .Form_Backgroun_Wrapper {
    position: absolute;
    bottom: 0;
    padding-right: 1.5rem;
    img {
      width: 100%;
      height: auto;
      display: block;
    }
  }
`;

interface AuthPhoneSuccessProps {
  registered: boolean;
}
const AuthPhoneSuccess: React.FC<AuthPhoneSuccessProps> = () => {
  return (
    <AuthPhoneSuccessBlock>
      <div className="Input_Wrapper">
        <input
          placeholder="인증코드를 입력하세요"
          value=""
          tabIndex={2}
          disabled={true}
        />
        <button tabIndex={3} disabled={true}>
          인증하기
        </button>
      </div>
      <div className="Form_Backgroun_Wrapper">
        <img src={undrawSmallTown} alt="auth_form" />
      </div>
    </AuthPhoneSuccessBlock>
  );
};

export default AuthPhoneSuccess;
