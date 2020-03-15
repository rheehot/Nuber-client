import { createReducer, createAction, ActionType } from 'typesafe-actions';

const SET_LOGGED_STATUS = 'core/SET_LOGGED_STATUS';
export const actions = {
  setLoggedStatus: createAction(
    SET_LOGGED_STATUS,
    (isLogged: boolean) => isLogged,
  )(),
};

type CoreActions = ActionType<typeof actions>;

interface CoreState {
  isLogged: boolean;
}

const initialState: CoreState = {
  isLogged: false,
};

const core = createReducer<CoreState, CoreActions>(initialState).handleAction(
  [actions.setLoggedStatus],
  (state, action) => {
    switch (action.type) {
      case SET_LOGGED_STATUS:
        return {
          ...state,
          isLogged: action.payload,
        };
      default: {
        return state;
      }
    }
  },
);
export default core;
