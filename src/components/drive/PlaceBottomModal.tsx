import React from 'react';
import styled, { css } from 'styled-components';
import media from '../../libs/styles/media';
import palette from '../../libs/styles/palette';
import transitions from '../../libs/styles/transitions';

const PlaceBottomModalBlock = styled.div<{ visible: boolean }>`
  display: none;
  ${media.small} {
    display: flex;
    position: fixed;
    height: 10rem;
    z-index: 999;
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
    .wrapper {
      display: flex;
      flex-direction: row;
      max-width: 500px;
      justify-content: space-around;
      align-items: center;
      margin-left: auto;
      margin-right: auto;
      padding-left: 8px;
      padding-right: 8px;
    }
  }
`;

interface PlaceBottomModalProps {
  visible: boolean;
}
const PlaceBottomModal: React.FC<PlaceBottomModalProps> = ({
  visible = false,
}) => {
  if (!visible) return null;
  return (
    <PlaceBottomModalBlock visible={visible}>
      <div className="wrapper">???</div>
    </PlaceBottomModalBlock>
  );
};

export default PlaceBottomModal;
