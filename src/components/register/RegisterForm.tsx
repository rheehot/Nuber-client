import React from 'react';
import styled from 'styled-components';

import { IoIosArrowRoundForward as ArrowIcon } from 'react-icons/io';
import { format } from 'date-fns';

import LabelInput from '../common/LabelInput';
import LabelSelect from '../common/LabelSelect';
import LabelDatePicker from '../common/LabelDatePicker';
import LabelPhone from '../common/LabelPhone';
import useForm from './hooks/useForm';
import palette from '../../libs/styles/palette';
import { Link } from 'react-router-dom';
import media from '../../libs/styles/media';

const RegisterFormBlock = styled.div`
  margin-top: 2.5rem;
  h1 {
    font-size: 2.5rem;
    color: ${palette.gray9};
    font-weight: bolder;
    margin: 0;
  }
  .description {
    font-size: 1.4rem;
    color: ${palette.gray9};
  }

  .input-area {
    margin-top: 1.5rem;
  }

  .register-btn {
    margin-top: 1.5rem;
    width: 100%;
    padding: 11px 20px;
    font-weight: 600;
    font-size: 14px;
    border-radius: 0;
    border: 2px solid ${palette.gray7};
    text-transform: uppercase;
    outline: 0;
    line-height: 18px;
    position: relative;
    font-weight: bold;
    transition: all 0.4s ease !important;
    text-decoration: none;
    color: ${palette.gray1};
    display: inline-block;
    vertical-align: middle;
    font-family: ff-clan-web-pro, 'Helvetica Neue', Helvetica, sans-serif;
    cursor: pointer;
    overflow: visible;
    background-color: ${palette.gray7};

    &:active {
      background-color: ${palette.gray9};
      border-color: ${palette.gray9};
    }

    &:focus {
      background-color: ${palette.gray9};
      border-color: ${palette.gray9};
    }

    .text {
      cursor: pointer;
    }

    svg {
      font-size: 1.4em;
      transition: margin 0.4s ease;
      position: absolute;
      right: 20px;
      top: calc(50% - 10px);
      color: ${palette.gray2};
      font-style: normal;
      font-variant: normal;
      text-transform: none;
      line-height: 1;
    }
  }

  .signup-link {
    display: none;
    font-size: 0.85714rem;
    margin-bottom: 24px;
    margin-top: 24px;
    ${media.small} {
      display: block;
    }
    & > p {
      display: inline;
      letter-spacing: 0.005em;
      a {
        margin-left: 0.25rem;
        margin-right: 0.25rem;
        color: ${palette.teal7};
        text-decoration: none;
        cursor: pointer;
      }
    }
  }

  .error {
    margin-top: 1rem;
    margin-bottom: 1rem;
    font-size: 1.125rem;
    line-height: 1.5;
    color: ${palette.red5};
    font-weight: bold;
  }
`;

export interface RegisterFormType {
  email: string;
  phone: string;
  country_code: string;
  birth: string;
  first_name: string;
  last_name: string;
  gender: 'MALE' | 'FEMALE' | 'UNKNOWN';
}

interface RegisterFormProps {
  error: string | null;
  fixedEmail: string | null | undefined;
  fixedPhone: string | null | undefined;
  onSubmit: (form: RegisterFormType) => Promise<void>;
}
const RegisterForm: React.FC<RegisterFormProps> = ({
  error,
  fixedEmail,
  fixedPhone,
  onSubmit,
}) => {
  const [state, onChange, onReset] = useForm();

  const defaultBirth = format(new Date(), 'yyyy-MM-dd');
  const [birth, setBirth] = React.useState(defaultBirth);

  const onDateChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setBirth(e.target.value);
    },
    [],
  );

  React.useEffect(() => {
    onReset();
  }, []);

  return (
    <RegisterFormBlock className="RegisterForm">
      <h1>환영합니다!</h1>
      <div className="description">기본 회원 정보를 등록해주세요.</div>
      <div className="input-area">
        <LabelInput
          label="성"
          name="first_name"
          value={state.first_name}
          placeholder="성을 입력하세요."
          onChange={e => onChange(e, 'SetFormDataAction')}
        />
        <LabelInput
          label="이름"
          name="last_name"
          value={state.last_name}
          placeholder="이름을 입력하세요."
          onChange={e => onChange(e, 'SetFormDataAction')}
        />
        <LabelInput
          label="이메일"
          name="email"
          value={fixedEmail || state.email}
          disabled={!!fixedEmail}
          placeholder="이메일을 입력하세요."
          onChange={e => onChange(e, 'SetFormDataAction')}
        />
        <LabelPhone
          label="전화번호"
          country_name="country_code"
          phone_name="phone"
          country_code={state.country_code}
          phone={fixedPhone || state.phone}
          onChangeCountry={(e: any) => onChange(e, 'SetFormDataAction')}
          onChangePhone={(e: any) => onChange(e, 'SetFormDataAction')}
          placeholder="전화번호를 입력하세요."
          disabled={!!fixedPhone}
        />
        <LabelDatePicker
          label="생일"
          birth={birth}
          onDateChange={onDateChange}
        />
        <LabelSelect
          lable="성별"
          name="gender"
          value={state.gender}
          onChange={e => onChange(e, 'SetFormDataAction')}
        >
          <option value="MALE">남자</option>
          <option value="FEMALE">여자</option>
          <option value="UNKNOWN">알수없음</option>
        </LabelSelect>
      </div>
      {error && <div className="error">{error}</div>}
      <button
        className="register-btn"
        onClick={() =>
          onSubmit({
            first_name: state.first_name,
            last_name: state.last_name,
            email: state.email || fixedEmail!,
            phone: state.phone || fixedPhone!,
            country_code: state.country_code,
            birth,
            gender: state.gender,
          })
        }
      >
        <span className="text">가입하기</span>
        <ArrowIcon />
      </button>
      <div className="signup-link">
        <p>
          홈으로 돌아가시겠습니까?
          <Link to="/">홈으로</Link>
        </p>
      </div>
    </RegisterFormBlock>
  );
};

export default RegisterForm;
