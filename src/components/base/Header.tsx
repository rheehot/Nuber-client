import React from 'react';
import styled from 'styled-components';
import MainResponsive from '../common/MainResponsive';
import media from '../../libs/styles/media';
import HeaderUserIcon from './HeaderUserIcon';
import HeaderLogo from './HeaderLogo';

const HeaderBlock = styled.div`
  height: 3.75rem;
`;

const Inner = styled(MainResponsive)`
  height: 100%;
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
