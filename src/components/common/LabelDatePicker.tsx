import React from 'react';
import styled from 'styled-components';
import palette from '../../libs/styles/palette';
import media from '../../libs/styles/media';

const LabelInputBlock = styled.div`
  margin-top: 1rem;
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
`;

export interface LabelInputProps {
  label: string;
  birth: string;
  onDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const LabelDatePicker: React.FC<LabelInputProps> = ({
  label,
  birth,
  onDateChange,
}) => {
  return (
    <LabelInputBlock>
      <label>{label}</label>
      <div className="group">
        <div className="input-wrapper">
          <input type="date" value={birth} onChange={onDateChange} />
        </div>
      </div>
    </LabelInputBlock>
  );
};

export default LabelDatePicker;
