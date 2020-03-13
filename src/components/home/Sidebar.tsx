import React from 'react';
import styled from 'styled-components';
import { FaRegStar as StartIcon } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import palette from '../../libs/styles/palette';

const SidebarBlcok = styled.div`
  height: 100%;
  .Menu_Header {
    background-color: black;
    height: 20%;
    margin-bottom: 30px;
    padding: 0 15px;
    color: white;
    .Grid_Wrapper {
      display: grid;
      grid-template-columns: 1fr 2fr;
      grid-gap: 10px;
      height: 100%;
      align-items: center;

      .Text {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;

        .Name {
          font-size: 22px;
          color: white;
          margin-top: 0;
          margin-bottom: 20px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .Rating-Wrapper {
          display: inline-flex;
          .Rating {
            margin-left: 1.125rem;
            margin-bottom: 0.25rem;
            font-size: 15px;
            color: white;
          }
        }
      }
    }

    .User_Profile {
      height: 60px;
      width: 60px;
      background-color: grey;
      border-radius: 40px;
      overflow: hidden;
    }
  }
`;

const SettingLink = styled(Link)`
  display: block;
  font-size: 22px;
  margin-left: 15px;
  margin-bottom: 25px;
  font-weight: 400;
  color: ${palette.gray7};
  text-decoration: none;
  &:hover {
    color: ${palette.gray9};
  }
`;

interface ToggleProps {
  isDriving: boolean;
}

const ToggleDriving = styled.button<ToggleProps>`
  -webkit-appearance: none;
  background-color: ${props =>
    props.isDriving ? palette.gray5 : palette.blue5};
  width: 100%;
  color: white;
  font-size: 18px;
  border: 0;
  padding: 15px 0px;
  cursor: pointer;
  &:hover {
    background-color: ${props =>
      props.isDriving ? palette.gray7 : palette.blue7};
  }
`;

interface SidebarProps {}
const Sidebar: React.FC<SidebarProps> = ({}) => {
  return (
    <SidebarBlcok className="Sidebar_Wrapper">
      <header className="Menu_Header">
        <div className="Grid_Wrapper">
          <Link to="/">
            <img
              className="User_Profile"
              src="https://img.velog.io/thumbnails/veloss/43c665f0-b44c-11e8-b8f5-49cedc880031-DHxDbYmUwAASvCI.png?w=120"
              alt="유저 사진"
            />
          </Link>
          <span className="Text">
            <h3 className="Name">veloss</h3>
            <div className="Rating-Wrapper">
              <StartIcon />
              <span className="Rating">4.5</span>
            </div>
          </span>
        </div>
      </header>
      <SettingLink to="/trips">나의 프로필</SettingLink>
      <SettingLink to="/trips">나의 여행</SettingLink>
      <SettingLink to="/settings">설정</SettingLink>
      <ToggleDriving isDriving={false}>운행시작</ToggleDriving>
      <HowTo />
    </SidebarBlcok>
  );
};

export default Sidebar;

const HowToBlock = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  text-align: center;

  background-image: url('https://t1.daumcdn.net/localimg/localimages/07/2018/pc/howto/bg_none_route2x.png');
  background-size: 390px auto;

  top: 430px;
  background: #f9f9f9
    url('https://t1.daumcdn.net/localimg/localimages/07/2018/pc/howto/bg_none_route.png')
    no-repeat 0 100%;

  .tit_intro {
    display: block;
    padding-top: 62px;
    font-weight: normal;
    line-height: 26px;
    color: #000;
    font-size: 22px;
    letter-spacing: 0;
  }

  .desc_intro {
    font-size: 14px;
    letter-spacing: 0;
    padding-top: 10px;
    line-height: 19px;
    color: #999;
  }
`;

interface HowToProps {}
const HowTo: React.FC<HowToProps> = ({}) => {
  return (
    <HowToBlock className="Howto">
      <strong className="tit_intro">
        오늘은
        <br />
        어디로 안내할까요?
      </strong>
      <p className="desc_intro">
        매일매일 업데이트되는 최신정보로
        <br />
        가장 빠른 경로를 알려드려요.
      </p>
    </HowToBlock>
  );
};
