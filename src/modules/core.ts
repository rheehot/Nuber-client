import { createReducer } from 'typesafe-actions';

type CoreAction = any;
interface CoreState {}
const initialState: CoreState = {};

const core = createReducer<CoreState, CoreAction>(initialState, {});
export default core;
