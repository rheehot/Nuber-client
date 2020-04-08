import React from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import { NavLink, useLocation } from 'react-router-dom';
import {
  MdDirectionsCar,
  MdPinDrop,
  MdDirectionsRailway,
  MdDirectionsBus,
} from 'react-icons/md';
import media from '../../libs/styles/media';
import palette from '../../libs/styles/palette';

const HomeTabBlock = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
  justify-self: center;
  grid-row: 1;
  grid-column: 1;
  .tab-list {
    display: flex;
    flex-direction: row;
    position: relative;
    opacity: 0.98;
    flex-wrap: nowrap;
    text-align: center;
    background-color: #ffffff;
    margin: 0;
    padding: 0;
    ${media.small} {
      overflow-y: scroll;
      justify-content: space-around;
    }

    a {
      display: inline-block;
      padding: 0;
      flex: 1;
      margin: 0;
      color: ${palette.gray8};
      text-decoration: none;
      .wrapper {
        padding-left: 12px;
        padding-right: 12px;
        padding-top: 20px;
        padding-bottom: 20px;
        transition: all 200ms ease;
        ${media.small} {
          width: 105px;
        }

        svg {
          margin: auto 0;
          ${media.small} {
            width: 18px;
            height: 18px;
          }
        }

        span {
          display: flex;
          align-items: center;
          font-size: 14px;
          line-height: 20px;
          font-weight: bold;
          justify-content: center;
          margin-top: 8px;
          ${media.small} {
            min-height: 48px;
          }
        }
      }
    }
  }
`;

const Indicator = styled(animated.div)`
  width: 25%;
  height: 2px;
  position: absolute;
  bottom: 0px;
  background: ${palette.gray8};
`;

interface HomeTabProps {}
const HomeTab: React.FC<HomeTabProps> = () => {
  const location = useLocation();
  let transition = '0%';
  switch (location.pathname) {
    case '/':
      transition = '0%';
      break;
    case '/nav':
      transition = '25%';
      break;
    case '/bus':
      transition = '50%';
      break;
    case '/raillway':
      transition = '75%';
      break;
    default:
      transition = '0%';
      break;
  }

  const springStyle = useSpring({
    left: transition,
    config: {
      friction: 16,
      tensiton: 160,
    },
  });

  return (
    <HomeTabBlock>
      <div className="tab-list">
        <NavLink
          to="/"
          activeClassName="active"
          isActive={(match, location) => {
            return ['/'].indexOf(location.pathname) !== -1;
          }}
        >
          <div className="wrapper">
            <MdDirectionsCar />
            <span>차량서비스</span>
          </div>
        </NavLink>
        <NavLink to="/nav" activeClassName="active">
          <div className="wrapper">
            <MdPinDrop />
            <span>내비</span>
          </div>
        </NavLink>
        <NavLink to="/bus" activeClassName="active">
          <div className="wrapper">
            <MdDirectionsBus />
            <span>버스</span>
          </div>
        </NavLink>
        <NavLink to="/raillway" activeClassName="active">
          <div className="wrapper">
            <MdDirectionsRailway />
            <span>지하철</span>
          </div>
        </NavLink>
        <Indicator style={springStyle} />
      </div>
    </HomeTabBlock>
  );
};

export default HomeTab;
