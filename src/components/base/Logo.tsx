import React from 'react';
import styled, { css } from 'styled-components';
import { uberlogo } from '../../static/images';

const LogoBlock = styled.div<{ styles: string | undefined }>`
  ${props =>
    props.styles &&
    css`
      ${props.styles}
    `}
  height: 94px;
  width: 94px;
  margin: 0 auto;
  background-color: #000;
  color: #939393;
  font-size: 1.6vw;
  font-weight: 500;
  .Logo_Wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    .Content {
      padding: 12.5%;
      img {
        margin-top: 5px;
        font-size: 13.33px;
        color: #fff;
        width: 100px !important;
        max-width: 100px !important;
      }
    }
  }
`;
interface LogoProps {
  onClick?: () => void;
  styles?: string;
}
const Logo: React.FC<LogoProps> = ({ styles, onClick }) => {
  return (
    <LogoBlock className="Logo" styles={styles}>
      <div className="Logo_Wrapper">
        <div className="Content" onClick={onClick}>
          <img className="Logo_Image" src={uberlogo} alt="uber logo" />
        </div>
      </div>
    </LogoBlock>
  );
};

export default Logo;
