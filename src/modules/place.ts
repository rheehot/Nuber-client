import { createAction, createReducer, ActionType } from 'typesafe-actions';

const SET_BOTTOM_MODAL_PLACE_INFO = 'place/SET_BOTTOM_MODAL_PLACE_INFO';

export const actions = {
  setBottomModalInfo: createAction(
    SET_BOTTOM_MODAL_PLACE_INFO,
    (placeInfo: Address) => placeInfo,
  )(),
};

export interface AddressInfo {
  address_name: string;
  main_address_no: string;
  mountain_yn: 'N' | 'Y';
  region_1depth_name?: string;
  region_2depth_name?: string;
  region_3depth_name: string;
  sub_address_no?: string;
}

export interface RoadAddressInfo {
  address_name: string;
  building_name: string;
  main_building_no: string;
  region_1depth_name: string;
  region_2depth_name: string;
  region_3depth_name?: string;
  road_name: string;
  sub_building_no?: string;
  underground_yn: 'N' | 'Y';
  zone_no: string;
}

export interface Address {
  address: AddressInfo;
  road_address: RoadAddressInfo;
}

type PlaceActions = ActionType<typeof actions>;

interface PlaceState {
  address: Address | null;
}

const initialState: PlaceState = {
  address: null,
};

const place = createReducer<PlaceState, PlaceActions>(
  initialState,
).handleAction([actions.setBottomModalInfo], (state, action) => {
  switch (action.type) {
    case SET_BOTTOM_MODAL_PLACE_INFO:
      return {
        ...state,
        address: action.payload,
      };
    default:
      return state;
  }
});

export default place;
