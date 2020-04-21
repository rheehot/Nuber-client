import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

import { actions } from '../../modules/map';
import { RootState } from '../../modules';

const MapViewBlock = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
`;

type EnhancerPositionCallback<P = Position, M = any> = (
  postion: P,
  map: M,
) => void;

interface MapViewProps {
  targetLoad: (element: HTMLDivElement | null) => void;
}
const MapView: React.FC<MapViewProps> = ({ targetLoad, children }) => {
  const { kakaoMap, kakaoMapsObj } = useSelector(
    (state: RootState) => state.map,
  );

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!kakaoMap || !kakaoMapsObj) return;
    kakaoMapsObj.maps.event.addListener(kakaoMap, 'click', onMarkerMapClick);
    onSetCurrentPosition();
    return () => {
      if (!kakaoMap || !kakaoMapsObj) {
        kakaoMapsObj.maps.event.removeListener(
          kakaoMap,
          'click',
          onMarkerMapClick,
        );
      }
    };
  }, [kakaoMap]);

  const onSetCurrentPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        position => successGeolocation(position, kakaoMap),
        error => errorGeolocation(error),
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        },
      );
      return;
    }
    const position = new kakaoMapsObj.maps.LatLng(33.450701, 126.570667);
    setCurrentPosition(position);
  };

  const successGeolocation: EnhancerPositionCallback = position => {
    const { latitude, longitude } = position.coords;
    const locationPosition = new kakaoMapsObj.maps.LatLng(latitude, longitude);
    setCurrentPosition(locationPosition);
  };

  const errorGeolocation: PositionErrorCallback = error => console.error(error);

  const setCurrentPosition = (position: any) => {
    const {
      maps: { Marker },
    } = kakaoMapsObj;
    kakaoMap.setCenter(position);

    const marker = new Marker({
      map: kakaoMap,
      position,
    });

    dispatch(actions.setKakaoMarker(marker));
  };

  const onMarkerMapClick = (e: any) => {
    console.log(e);
  };

  return (
    <MapViewBlock className="Map" ref={targetLoad}>
      {children}
    </MapViewBlock>
  );
};

export default MapView;
