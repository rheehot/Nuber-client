import { useReducer, useCallback } from 'react';

type SetFormDataAction = {
  type: 'SetFormDataAction';
  name: string;
  value: any;
};

type InitialStateAction = {
  type: 'INITIAL_STATE';
};

type UseFormAction = SetFormDataAction | InitialStateAction;
type TypeAction = 'SetFormDataAction' | 'INITIAL_STATE';

type State = {
  email: string;
  phone: string;
  country_code: string;
  first_name: string;
  last_name: string;
  gender: 'MALE' | 'FEMALE' | 'UNKNOWN';
};

function reducer(state: State, action: UseFormAction) {
  switch (action.type) {
    case 'INITIAL_STATE': {
      return state;
    }
    case 'SetFormDataAction': {
      return {
        ...state,
        [action.name]: action.value,
      };
    }
    default:
      return state;
  }
}

const initialState: State = {
  email: '',
  first_name: '',
  last_name: '',
  phone: '',
  country_code: '+82',
  gender: 'UNKNOWN',
};

export default function useForm(defaultValue?: State) {
  const [state, dispatch] = useReducer(reducer, defaultValue || initialState);
  const onChange = useCallback((e: any, type: TypeAction) => {
    dispatch({
      type,
      name: e.target.name,
      value: e.target.value,
    });
  }, []);

  const onReset = useCallback(() => {
    dispatch({
      type: 'INITIAL_STATE',
    });
  }, []);

  return [state, onChange, onReset, dispatch] as [
    State,
    typeof onChange,
    typeof onReset,
    typeof dispatch,
  ];
}
