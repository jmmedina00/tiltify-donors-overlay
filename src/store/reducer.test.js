import { LOAD_PARAMS } from './actions';
import { reducer } from './reducer';

describe('Reducer', () => {
  test('loads params upon receiving a LOAD_PARAMS action', () => {
    const params = { a: '1', b: '2' };
    expect(reducer({}, { type: LOAD_PARAMS, data: params })).toEqual(params);
  });

  test('fuses existing state with new params', () => {
    const initialState = { a: '1', b: '2' };
    const params = { b: '3', c: '4' };
    const expected = { ...initialState, ...params };
    expect(reducer(initialState, { type: LOAD_PARAMS, data: params })).toEqual(
      expected
    );
  });

  test('returns state as is if anything else is received', () => {
    const initialState = { a: '1', b: '2' };
    const foreignAction = {
      type: 'IDONTKNOWWHATIMDOING',
      text: 'Lorem ipsum',
    };
    expect(reducer(initialState, foreignAction)).toEqual(initialState);
  });
});
