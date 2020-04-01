import React from 'react';
import styled from 'styled-components';
import countries from '../../libs/countries';
import palette from '../../libs/styles/palette';
import media from '../../libs/styles/media';

const LabelPhoneBlock = styled.div`
  select {
    font-size: 20px;
    color: '#2c3e50';
    appearance: none;
    background-color: white;
    border: 0;
    font-family: 'Maven Pro';
    width: 100%;
  }

  label,
  input {
    display: block;
    line-height: 1.5;
  }
  label {
    font-weight: bold;
    font-size: 1.125rem;
    color: ${palette.gray9};
    margin-bottom: 1rem;
    transition: all 0.125s ease-in;
  }

  input {
    font-size: 1.5rem;
    border: none;
    outline: none;
    ${media.small} {
      font-size: 1.125rem;
    }
    width: 100%;
    color: ${palette.gray7};
    transition: all 0.125s ease-in;
    &::placeholder {
      color: ${palette.gray5};
    }
    &:disabled {
      color: ${palette.gray6};
    }
  }

  .group {
    /* display: inline-block; */
    max-width: 100%;
  }
  .input-wrapper {
    padding-bottom: 0.5rem;
    border-bottom: 1px solid ${palette.gray7};
    display: flex;
    align-items: center;
    input {
      width: 1;
    }
  }
`;

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

interface LabelPhoneProps {
  label: string;
  phone: string;
  phone_name: string;
  country_code: string;
  country_name: string;
  onChangePhone: any;
  onChangeCountry: any;
  placeholder: string;
  disabled: boolean;
}
const LabelPhone: React.FC<LabelPhoneProps> = ({
  label,
  phone_name,
  country_name,
  country_code,
  phone,
  placeholder,
  onChangePhone,
  onChangeCountry,
  disabled,
}) => {
  return (
    <LabelPhoneBlock>
      <label>{label}</label>
      <div className="group">
        <select
          value={country_code}
          name={country_name}
          onChange={onChangeCountry}
        >
          {countries.map((country, index) => (
            <option key={`${index}|${Date.now()}`} value={country.dial_code}>
              {country.flag} {country.name} ({country.dial_code})
            </option>
          ))}
        </select>
        <div className="input-wrapper">
          <input
            type="tel"
            onChange={onChangePhone}
            value={phone}
            name={phone_name}
            placeholder={placeholder}
            disabled={disabled}
          />
        </div>
      </div>
    </LabelPhoneBlock>
  );
};

export default LabelPhone;
