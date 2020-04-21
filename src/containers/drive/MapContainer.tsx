import React from 'react';
import SideBar from 'react-sidebar';

import { useDispatch } from 'react-redux';

import MapView from '../../components/drive/MapView';
import MenuButton from '../../components/drive/MenuButton';
import SidebarContainer from './SidebarContainer';
import useLoadMap from './hooks/useLoadMap';

import { actions } from '../../modules/map';
import PlaceBottomModalContainer from './PlaceBottomModalContainer';

const SidebarStyled = {
  sidebar: {
    backgroundColor: 'white',
    width: '256px',
    height: '100%',
    zIndex: '10',
  },
};

interface MapContainerProps {}
const MapContainer: React.FC<MapContainerProps> = () => {
  const dispatch = useDispatch();

  const [open, setToggle] = React.useState(false);
  // 카카오 sdk 객체
  const [{ kakaoMapObj }] = useLoadMap();
  // marker 객체
  const onCloseToggle = React.useCallback(() => {
    setToggle(false);
  }, [setToggle]);

  const onOpenToggle = React.useCallback(() => {
    setToggle(true);
  }, [setToggle]);

  const loadMapRef = React.useCallback(
    (element: HTMLDivElement | null) => {
      if (!kakaoMapObj || !element) return;
      const {
        maps: { LatLng, Map },
      } = kakaoMapObj;

      const map = new Map(element, {
        level: 3,
        center: new LatLng(33.450701, 126.570667),
      });

      dispatch(actions.setKakaoMapsObj(kakaoMapObj));
      dispatch(actions.setKakaoMap(map));
    },
    [kakaoMapObj],
  );

  return (
    <React.Fragment>
      <SideBar
        overlayClassName="Sidebar_Overlay"
        sidebar={<SidebarContainer />}
        open={open}
        onSetOpen={onCloseToggle}
        styles={SidebarStyled}
      >
        <MenuButton onToggle={onOpenToggle} />
        <MapView targetLoad={loadMapRef}>
          <PlaceBottomModalContainer />
        </MapView>
      </SideBar>
    </React.Fragment>
  );
};

export default MapContainer;
