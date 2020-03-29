import React from 'react';
import styled from 'styled-components';
import countries from '../../libs/countries';
import palette from '../../libs/styles/palette';

const AuthPhoneFormBlock = styled.form`
  flex-direction: column;
  .Select_Wrapper {
    padding-bottom: 1rem;
    select {
      width: auto;
      flex: 1;
      font-size: 15px;
      color: '#2c3e50';
      -moz-appearance: none;
      appearance: none;
      background-color: white;
      border: 0;
    }
  }

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

interface AuthPhoneFormProps {
  phone: string;
  select: string;
  disabled: boolean;
  onChangeSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (phone: string) => Promise<void>;
}
const AuthPhoneForm: React.FC<AuthPhoneFormProps> = ({
  phone,
  disabled,
  onChange,
  select,
  onSubmit,
  onChangeSelect,
}) => {
  return (
    <AuthPhoneFormBlock
      onSubmit={e => {
        e.preventDefault();
        onSubmit(phone);
      }}
    >
      <div className="Select_Wrapper">
        <select value={select} onChange={onChangeSelect}>
          {countries.map((country, index) => (
            <option key={`${index}|${Date.now()}`} value={country.dial_code}>
              {country.flag} {country.name} ({country.dial_code})
            </option>
          ))}
        </select>
      </div>
      <div className="Input_Wrapper">
        <input
          placeholder="전화번호을 입력하세요"
          value={phone}
          tabIndex={2}
          disabled={disabled}
          onChange={onChange}
        />
        <button tabIndex={3} disabled={disabled}>
          로그인
        </button>
      </div>
    </AuthPhoneFormBlock>
  );
};

export default AuthPhoneForm;
