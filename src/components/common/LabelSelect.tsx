import React from 'react';
import styled from 'styled-components';
import palette from '../../libs/styles/palette';
import media from '../../libs/styles/media';

const LabelSelectBlock = styled.div<{ focus: boolean }>`
  margin-top: 1.5rem;
  label,
  select {
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
  select {
    font-size: 1.5rem;
    border: none;
    outline: none;
    ${media.small} {
      font-size: 1.125rem;
    }
    width: 100%;
    color: ${palette.gray7};
    background-color: #ffff;
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
    svg {
      font-size: 1.5rem;
      color: ${palette.gray6};
    }
  }

  & + & {
    margin-top: 1.6rem;
  }
`;

type SelectProps = React.DetailedHTMLProps<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>;

interface LabelSelectProps extends SelectProps {
  lable: string;
  placeholder?: string;
  name?: string;
  value?: string;
  onChange?: React.ChangeEventHandler;
}
const LabelSelect: React.FC<LabelSelectProps> = ({
  lable,
  children,
  name,
  value,
  placeholder,
  onChange,
  disabled,
  ...rest
}) => {
  return (
    <LabelSelectBlock focus>
      <label>{lable}</label>
      <div className="group">
        <div className="input-wrapper">
          <select value={value} name={name} onChange={onChange} {...rest}>
            {children}
          </select>
        </div>
      </div>
    </LabelSelectBlock>
  );
};

export default LabelSelect;
