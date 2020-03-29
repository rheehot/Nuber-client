import React from 'react';
import styled from 'styled-components';
import palette from '../../libs/styles/palette';

const { LoopCircleLoading } = require('react-loadingg');

const CodeTemplateBlock = styled.div`
  width: 100%;
  min-height: 100%;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  background: radial-gradient(at 50% 0%, #212529d9, #212529);
  .text {
    text-align: center;
    font-weight: bold;
    font-size: 1.25rem;
    color: ${palette.gray3};
    margin-top: 15rem;
  }
`;

interface CodeTemplateProps {}
const CodeTemplate: React.FC<CodeTemplateProps> = ({ children }) => {
  return (
    <CodeTemplateBlock>
      <LoopCircleLoading />
      <p className="text">
        코드를 확인하고 있습니다. <br /> 잠시만 기달려주세요.
      </p>
      <div>{children}</div>
    </CodeTemplateBlock>
  );
};

export default CodeTemplate;
