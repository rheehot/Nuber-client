import { useReducer, useCallback } from 'react';

type StatusType = string;

interface MapState {
  lat: number;
  lng: number;
  toLat: number;
  toLng: number;
  toAddress: string;
  fromAddress: string;
  distance: string;
  duration: string;
  price?: string;
  hasRequest: boolean;
  request?: string;
  status: StatusType;
}

const initialState: MapState = {
  lat: 0,
  lng: 0,
  toLat: 0,
  toLng: 0,
  toAddress: '',
  fromAddress: '',
  distance: '',
  duration: '',
  price: '',
  hasRequest: false,
  request: '',
  status: 'idle',
};

type ResetAction = {
  type: 'RESET';
};

type SetAddressAction = {
  type: 'SET_ADDRESS';
  payload: {
    lat: number;
    lng: number;
    fromAddress: string;
  };
};

type SetLatLngAction = {
  type: 'SET_LAT_LNG';
  payload: {
    lat: number;
    lng: number;
  };
};

type SetToAddressAction = {
  type: 'SET_TO_ADDRESS';
  payload: {
    toAddress: string;
  };
};

type PayloadActions =
  | ResetAction
  | SetAddressAction
  | SetLatLngAction
  | SetToAddressAction;

function reducer(state: MapState, action: PayloadActions) {
  switch (action.type) {
    case 'RESET': {
      return initialState;
    }
    case 'SET_TO_ADDRESS': {
      return {
        ...state,
        toAddress: action.payload.toAddress,
      };
    }
    case 'SET_ADDRESS': {
      return {
        ...state,
        lat: action.payload.lat,
        lng: action.payload.lng,
        fromAddress: action.payload.fromAddress,
      };
    }
    case 'SET_LAT_LNG': {
      return {
        ...state,
        lat: action.payload.lat,
        lng: action.payload.lng,
      };
    }
    default:
      return state;
  }
}

export default function useMaps() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const onAddressChange = useCallback(
    (latitude: number, longitude: number, address: string) => {
      dispatch({
        type: 'SET_ADDRESS',
        payload: {
          lat: latitude,
          lng: longitude,
          fromAddress: address,
        },
      });
    },
    [],
  );

  const onLatLngChange = useCallback((latitude: number, longitude: number) => {
    dispatch({
      type: 'SET_LAT_LNG',
      payload: {
        lat: latitude,
        lng: longitude,
      },
    });
  }, []);

  const onToAddressChange = useCallback((toAddress: string) => {
    dispatch({
      type: 'SET_TO_ADDRESS',
      payload: {
        toAddress,
      },
    });
  }, []);
  return [
    state,
    dispatch,
    onAddressChange,
    onLatLngChange,
    onToAddressChange,
  ] as [
    MapState,
    typeof dispatch,
    typeof onAddressChange,
    typeof onLatLngChange,
    typeof onToAddressChange,
  ];
}
