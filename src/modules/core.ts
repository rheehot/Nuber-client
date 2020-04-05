import { createReducer, createAction, ActionType } from 'typesafe-actions';
import { CurrentUser } from '../libs/graphql/user';

const SET_LOGGED_STATUS = 'core/SET_LOGGED_STATUS';
const SET_USER = 'core/SET_USER';

export const actions = {
  setUser: createAction(SET_USER, (user: CurrentUser | null) => user)(),
  setLoggedStatus: createAction(
    SET_LOGGED_STATUS,
    (isLogged: boolean) => isLogged,
  )(),
};

type CoreActions = ActionType<typeof actions>;

interface CoreState {
  isLogged: boolean;
  user: CurrentUser | null;
}

const initialState: CoreState = {
  // isLogged: false,
  isLogged: true,
  user: null,
};

const core = createReducer<CoreState, CoreActions>(initialState).handleAction(
  [actions.setLoggedStatus, actions.setUser],
  (state, action) => {
    switch (action.type) {
      case SET_LOGGED_STATUS: {
        return {
          ...state,
          isLogged: action.payload,
        };
      }
      case SET_USER: {
        return {
          ...state,
          user: action.payload,
        };
      }
      default: {
        return state;
      }
    }
  },
);
export default core;
