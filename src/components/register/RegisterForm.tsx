import React from 'react';
import styled from 'styled-components';
import LabelInput from '../common/LabelInput';
import LabelSelect from '../common/LabelSelect';

const RegisterFormBlock = styled.div`
  margin-top: 3rem;
`;

interface RegisterFormProps {}
const RegisterForm: React.FC<RegisterFormProps> = () => {
  return (
    <RegisterFormBlock className="RegisterForm">
      <LabelInput label="성" />
      <LabelInput label="이름" />
      <LabelInput label="이메일" />
      <LabelInput label="전화번호" />
      <LabelSelect lable="성별" />
      <LabelSelect lable="생일" />
    </RegisterFormBlock>
  );
};

export default RegisterForm;
