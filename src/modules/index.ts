import { combineReducers } from 'redux';
import core from './core';
import map from './map';

const rootReducer = combineReducers({
  core,
  map,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
