import { useEffect, useState } from 'react';
import { loadScript } from '../../../libs/apollo/utils';

interface MapState {
  kakaoMapLoaded: boolean;
  kakaoMapObj: any;
}

function useLoadMap() {
  const [state, setState] = useState<MapState>({
    kakaoMapLoaded: false,
    kakaoMapObj: null,
  });

  useEffect(() => {
    const promise = async () => {
      await loadScript(
        'http://dapi.kakao.com/v2/maps/sdk.js?appkey=15ef3830746a44ccdb4a26b82bf509aa&libraries=services,clusterer,drawing&autoload=false',
      );
      const Kakao = (window as any).kakao;
      Kakao &&
        Kakao.maps.load(() => {
          setState({
            kakaoMapLoaded: true,
            kakaoMapObj: (window as any).kakao,
          });
        });
    };

    promise();
  }, []);
  return [state];
}

export default useLoadMap;
