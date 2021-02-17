import { LOAD_PARAMS } from './actions';

const initialState = {};

export const reducer = (state = initialState, action) =>
  action.type === LOAD_PARAMS ? { ...state, ...action.data } : state;
