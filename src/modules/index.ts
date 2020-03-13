import { combineReducers } from 'redux';
import core from './core';

const rootReducer = combineReducers({
  core,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
