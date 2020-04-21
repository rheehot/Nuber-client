import { createAction, ActionType, createReducer } from 'typesafe-actions';

const SET_KAKAO_MAPS_OBJ = 'map/SET_KAKAO_MAPS_OBJ';
const SET_KAKAO_MAP = 'map/SET_KAKAO_MAP';
const SET_KAKAO_MARKER = 'map/SET_KAKAO_MARKER';
const SET_KAKAO_OVERLAY = 'map/SET_KAKAO_OVERLAY';

export const actions = {
  setKakaoMapsObj: createAction(
    SET_KAKAO_MAPS_OBJ,
    (kakaoMapsObj: any) => kakaoMapsObj,
  )(),
  setKakaoMap: createAction(SET_KAKAO_MAP, (kakaoMap: any) => kakaoMap)(),
  setKakaoMarker: createAction(
    SET_KAKAO_MARKER,
    (kakaoMarker: any) => kakaoMarker,
  )(),
};

type MapActions = ActionType<typeof actions>;

interface MapState {
  kakaoMapsObj: any;
  kakaoMap: any;
  kakaoMarker: any;
}

const initialState: MapState = {
  kakaoMap: null,
  kakaoMapsObj: null,
  kakaoMarker: null,
};

const map = createReducer<MapState, MapActions>(initialState).handleAction(
  [actions.setKakaoMap, actions.setKakaoMapsObj, actions.setKakaoMarker],
  (state, action) => {
    switch (action.type) {
      case SET_KAKAO_MAP: {
        return {
          ...state,
          kakaoMap: action.payload,
        };
      }
      case SET_KAKAO_MAPS_OBJ: {
        return {
          ...state,
          kakaoMapsObj: action.payload,
        };
      }
      case SET_KAKAO_MARKER: {
        return {
          ...state,
          kakaoMarker: action.payload,
        };
      }
      default: {
        return state;
      }
    }
  },
);

export default map;
