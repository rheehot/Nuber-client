import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

import { actions as placeActions } from '../../modules/place';
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
  const kakaoGeocoder = React.useRef<any>(null);
  const kakaoMarker = React.useRef<any>(null);

  const { kakaoMap, kakaoMapsObj } = useSelector(
    (state: RootState) => state.map,
  );

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!kakaoMap || !kakaoMapsObj) return;
    kakaoGeocoder.current = new kakaoMapsObj.maps.services.Geocoder();
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

    kakaoMarker.current = marker;
  };

  const onMarkerMapClick = (e: any) => {
    const { latLng } = e;
    const coordsLng = latLng.getLng();
    const coordsLat = latLng.getLat();
    kakaoGeocoder.current.coord2Address(
      coordsLng,
      coordsLat,
      (result: any, status: any) => {
        if (status === kakaoMapsObj.maps.services.Status.OK) {
          dispatch(placeActions.setBottomModalInfo(result[0]));
        }
      },
    );
  };

  return (
    <MapViewBlock className="Map" ref={targetLoad}>
      {children}
    </MapViewBlock>
  );
};

export default MapView;
