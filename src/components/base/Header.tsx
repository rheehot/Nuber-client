import React from 'react';
import styled from 'styled-components';
import media from '../../libs/styles/media';
import HeaderUserIcon from './HeaderUserIcon';
import HeaderLogo from './HeaderLogo';

const HeaderBlock = styled.div`
  position: fixed;
  width: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: calc(59px);
  padding: 10px;
  z-index: 999;
  background-color: rgb(255, 255, 255);
`;

const Inner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  .write-button {
    ${media.medium} {
      display: none;
    }
  }
`;

interface HeaderProps {}
const Header: React.FC<HeaderProps> = () => {
  return (
    <HeaderBlock className="HeaderBlock">
      <Inner>
        <HeaderLogo />
        <Right>
          <HeaderUserIcon onClick={(e: any) => {}} user={null} />
        </Right>
      </Inner>
    </HeaderBlock>
  );
};

export default Header;
