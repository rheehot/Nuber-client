import React from 'react';
import styled, { css } from 'styled-components';

import { FaShareSquare, FaRegBookmark, FaCarAlt } from 'react-icons/fa';

import media from '../../libs/styles/media';
import palette from '../../libs/styles/palette';
import transitions from '../../libs/styles/transitions';
import { Address } from '../../modules/place';

import Button from '../common/Button';

const PlaceBottomModalBlock = styled.div<{ visible: boolean }>`
  display: none;
  ${media.small} {
    display: flex;
    position: fixed;
    height: 10rem;
    z-index: 8;
    bottom: 0;
    right: 0;
    left: 0;
    text-decoration: none;
    background-color: rgba(255, 255, 255, 255);
    transition: bottom 0.2s linear 0s;
    ${props =>
      props.visible
        ? css`
            animation: ${transitions.slideUp} 0.4s forwards ease-in-out;
          `
        : css`
            animation: ${transitions.slideDown} 0.2s forwards ease-in-out;
          `}
  }
`;

const HeaderTooltip = styled.div`
  display: block;
  font-size: 18px;
  padding: 20px 75px 0 20px;
  line-height: 22px;
  .tooltip-title {
    max-width: 226px;
    overflow: hidden;
    font-weight: 600;
    color: ${palette.gray7};
  }
`;

const HeaderDetailIdList = styled.span`
  font-size: 13px;
  line-height: 18px;
  display: block;
  padding: 5px 0px 10px 0px;
  color: ${palette.gray5};
  .codename {
    display: block;
    overflow: hidden;
    height: 18px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .buscode {
    display: block;
  }
  .bar {
    display: inline-block;
    width: 1px;
    height: 10px;
    margin: 0 5px;
    vertical-align: 0;
    background-color: ${palette.gray5};
  }
`;

const FooterToolButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding: 10px 18px 10px 18px;
`;

interface PlaceBottomModalProps {
  visible: boolean;
  address: Address | null;
}
const PlaceBottomModal: React.FC<PlaceBottomModalProps> = ({
  visible = false,
  address,
}) => {
  if (!visible) return null;
  console.log(address);
  return (
    <PlaceBottomModalBlock visible={visible}>
      <div className="wrapper">
        <HeaderTooltip>
          <strong className="tooltip-title">벽산동문5차아파트정문</strong>
          <HeaderDetailIdList>
            <span className="buscode">
              <span className="codename">
                56420
                <span className="bar" />
                동천동주민센터.머내농협 방면
              </span>
            </span>
          </HeaderDetailIdList>
        </HeaderTooltip>
        <FooterToolButtons>
          <Button color="lightGray" inline={true}>
            <FaShareSquare />
          </Button>
          <Button color="lightGray" inline={true}>
            <FaRegBookmark />
          </Button>
          <Button color="darkGray">
            <FaCarAlt />
          </Button>
        </FooterToolButtons>
      </div>
    </PlaceBottomModalBlock>
  );
};

export default PlaceBottomModal;
