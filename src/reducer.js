const initialState = {};

export const reducer = (state = initialState, action) => 
action.type === LOAD_PARAMS ? {...state, ...action.data} : state;