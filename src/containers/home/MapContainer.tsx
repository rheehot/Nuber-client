import React from 'react';
import SideBar from 'react-sidebar';
import Map from '../../components/home/Map';
import useLoadMap from '../../containers/home/hooks/useLoadMap';
import SidebarContainer from './SidebarContainer';
import MenuButton from '../base/MenuButton';

const SidebarStyled = {
  sidebar: {
    backgroundColor: 'white',
    width: '280px',
    zIndex: '10',
  },
};

type EnhancerPositionCallback<P = Position, M = any> = (
  postion: P,
  map: M,
) => void;

interface MapContainerProps {}
const MapContainer: React.FC<MapContainerProps> = () => {
  const [open, setToggle] = React.useState(false);
  const [kakaoMap, setKakaoMap] = React.useState<any>(null);
  const [{ kakaoMapObj }] = useLoadMap();

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

      setKakaoMap(map);

      if (navigator.geolocation) {
        navigator.geolocation.watchPosition(
          position => successGeolocation(position, map),
          error => errorGeolocation(error),
          {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
          },
        );
      } else {
        const position = new kakaoMapObj.maps.LatLng(33.450701, 126.570667);
        handelMarker(position, map);
      }
    },
    [kakaoMapObj],
  );

  const handelMarker = (position: any, map: any) => {
    const {
      maps: { Size, MarkerImage, Marker },
    } = kakaoMapObj;

    const imageSize = new Size(24, 35);
    const markerImage = new MarkerImage(
      'http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png',
      imageSize,
    );

    new Marker({
      map,
      position,
      image: markerImage,
    });

    map.setCenter(position);
  };

  const successGeolocation: EnhancerPositionCallback = (position, map) => {
    const { latitude, longitude } = position.coords;
    const locationPosition = new kakaoMapObj.maps.LatLng(latitude, longitude);
    handelMarker(locationPosition, map);
  };

  const errorGeolocation: PositionErrorCallback = error => {
    console.error(error);
  };

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
        <Map targetLoad={loadMapRef} />
      </SideBar>
    </React.Fragment>
  );
};

export default MapContainer;
