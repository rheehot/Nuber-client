import React from 'react';
import throttle from 'lodash/throttle';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { RootState } from '../../modules';
import { markerIcon } from '../../static/images';
import useMaps from './hooks/useMaps';

const MapViewBlock = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
`;

interface ReverseGeocode {
  address: string;
  error: boolean;
}

const errorCallback = console.error;

const locationOptions: PositionOptions = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

interface MapViewProps {
  targetLoad: (element: HTMLDivElement | null) => void;
}
const MapView: React.FC<MapViewProps> = ({ targetLoad, children }) => {
  const [
    state,
    _,
    onAddressChange,
    onLatLngChange,
    onToAddressChange,
    onRequestChange,
  ] = useMaps();

  const kakaoGeocoderRef = React.useRef<any>(null);
  const userMarkerRef = React.useRef<any>(null);
  const dragMarkerRef = React.useRef<any>(null);

  const { kakaoMap, kakaoMapsObj } = useSelector(
    (state: RootState) => state.map,
  );

  React.useEffect(() => {
    if (!kakaoMap || !kakaoMapsObj) return;
    kakaoGeocoderRef.current = new kakaoMapsObj.maps.services.Geocoder();
    // geolocation이 현재 브라우저에 있으면 해당 geolocation을 사용하고 아닐 경우
    // 카카오쪽을 사용
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        handleGeoSuccess,
        handleGeoError,
      );
    } else {
      const LatLng = new kakaoMapsObj.maps.LatLng(33.450701, 126.570667);
      const lat = LatLng.getLat();
      const lng = LatLng.getLng();
      handleNotGeo(lng, lat);
    }

    window.addEventListener(
      'deviceorientation',
      throttle(handleRotation, 5000, { trailing: true, leading: true }),
      true,
    );
    return () => {
      if (!kakaoMap || !kakaoMapsObj) {
        kakaoMapsObj.maps.event.removeListener(
          kakaoMap,
          'dragend',
          handleCenterChange,
        );
      }
    };
  }, [kakaoMap, state]);

  const reverseGeocode = async (
    lng: number,
    lat: number,
  ): Promise<ReverseGeocode> => {
    const {
      maps: { services, LatLng },
    } = kakaoMapsObj;
    const coord = new LatLng(lat, lng);
    return new Promise((resolve, reject) => {
      kakaoGeocoderRef.current.coord2Address(
        coord.getLng(),
        coord.getLat(),
        (result: any, status: string) => {
          if (status === services.Status.OK) {
            const firstAddress = result[0].address.address_name;
            resolve({
              address: firstAddress,
              error: false,
            });
            return;
          }
          resolve({
            address: '',
            error: true,
          });
          return;
        },
      );
    });
  };

  const handleGeoError: PositionErrorCallback = (error) => errorCallback(error);

  const handleNotGeo = React.useCallback(
    async (latitude, longitude) => {
      const { address, error } = await reverseGeocode(longitude, latitude);
      if (!error) {
        onAddressChange(latitude, longitude, address);
        loadMap();
      }
    },
    [kakaoMap, state],
  );

  const handleGeoSuccess: PositionCallback = React.useCallback(
    async (position) => {
      const {
        coords: { latitude, longitude },
      } = position;
      const { address, error } = await reverseGeocode(longitude, latitude);
      if (!error) {
        onAddressChange(latitude, longitude, address);
        loadMap();
      }
    },
    [kakaoMap, state],
  );

  const updatePosition: PositionCallback = React.useCallback(
    (position) => {
      const {
        maps: { LatLng },
      } = kakaoMapsObj;
      const {
        coords: { latitude, longitude },
      } = position;
      const latLng = new LatLng(latitude, longitude);
      userMarkerRef.current.setPosition(latLng);
      // TODO: API
    },
    [kakaoMap],
  );

  const hidrateAddress = React.useCallback(async () => {
    const { toLat, toLng } = state;
    const { address, error } = await reverseGeocode(toLat, toLng);
    if (!error) {
      onToAddressChange(address);
      return;
    }
    toast.error('Cant get location');
  }, [kakaoMap, state]);

  const handleCenterChange = React.useCallback(() => {
    const { status } = state;
    if (status === 'choosingFromMap') {
      const LatLng = kakaoMap.getCenter();
      const lat = LatLng.getLat();
      const lng = LatLng.getLng();
      onLatLngChange(lat, lng);
      hidrateAddress();
    }
  }, [kakaoMap]);

  const loadMap = React.useCallback(() => {
    const {
      maps: { Marker, Size, MarkerImage, LatLng },
    } = kakaoMapsObj;
    const latLng = new LatLng(state.lat, state.lng);
    kakaoMap.setCenter(latLng);
    // 현재 유저가 있는 위치를 마커로 표시
    const userMarker = new Marker({
      map: kakaoMap,
      image: new MarkerImage(markerIcon, new Size(15, 15)),
      position: latLng,
    });

    userMarkerRef.current = userMarker;
    userMarkerRef.current.setMap(kakaoMap);

    // 유저가 이동 할 위치를 드래그 마커로 시각적으로 표시한다.
    const dragMarker = new Marker({
      map: kakaoMap,
      draggable: true,
      position: latLng,
    });

    dragMarkerRef.current = dragMarker;
    dragMarkerRef.current.setMap(kakaoMap);

    kakaoMapsObj.maps.event.addListener(
      kakaoMap,
      'dragend',
      handleCenterChange,
    );

    // 현재의 위치가 변경이 되면 해당 변경 이벤트로 위치값을 가져온다
    navigator.geolocation.watchPosition(
      updatePosition,
      handleGeoError,
      locationOptions,
    );
    // TODO 드라이빙 모드냐 아니야
  }, [kakaoMap, state]);

  const handleRotation = (e: DeviceOrientationEvent) => {
    const { alpha } = e;
    console.log(alpha);
    // TODO: API
  };

  const handleRideRequest = (request: any) => onRequestChange(request);

  return (
    <MapViewBlock className="Map" ref={targetLoad}>
      {children}
    </MapViewBlock>
  );
};

export default MapView;
