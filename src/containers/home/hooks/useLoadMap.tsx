import { useState, useEffect, MutableRefObject } from 'react';
import { loadScript } from '../../../libs/apollo/utils';

function useLoadMap(targetRef: MutableRefObject<any>) {
  const [loading, setLoading] = useState(false);
  const [kakoMap, setKakaMap] = useState(null);

  useEffect(() => {
    setLoading(true);
    if ((window as any).kakao) return;
    loadScript(
      'http://dapi.kakao.com/v2/maps/sdk.js?appkey=15ef3830746a44ccdb4a26b82bf509aa&libraries=services,clusterer,drawing&autoload=false',
    ).then(() => {
      const Kakao = (window as any).kakao;
      if (Kakao) {
        setLoading(false);
      }
      const { maps } = Kakao;
      maps.load(() => {
        const node = new maps.Map(targetRef.current, {
          center: new maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
          level: 3,
        });
        setKakaMap(node);
      });
    });
  }, []);
  return [(window as any).kakao, kakoMap, loading] as [any, any, boolean];
}

export default useLoadMap;
