import { loadParams, LOAD_PARAMS } from "./actions";

describe("loadParams action", () => {
  test("creates an action with all the data to load", () => {
    const data = {a: "1", b: "2"};
    const expectedAction = {
      type: LOAD_PARAMS,
      data
    };
    expect(loadParams(data)).toEqual(expectedAction);
  })
})