import { combineReducers } from 'redux';
import core from './core';
import map from './map';
import place from './place';

const rootReducer = combineReducers({
  core,
  map,
  place,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
