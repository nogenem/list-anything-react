import { SEARCH_RESULTS, USER_LOGGED_OUT } from "../../constants/actionTypes";
import searchResults, { getResults, initialState } from "../searchResults";

const data = [
  {
    _id: "1"
  }
];

describe("searchResults - Reducer", () => {
  it("SEARCH_RESULTS", () => {
    const action = {
      type: SEARCH_RESULTS,
      data
    };
    const newState = searchResults(initialState, action);
    expect(newState).toBeInstanceOf(Array);
    expect(newState.length).toBe(1);
    expect(newState[0]._id).toBe("1");
  });

  it("USER_LOGGED_OUT", () => {
    const action = {
      type: USER_LOGGED_OUT
    };
    expect(searchResults(initialState, action)).toEqual(initialState);
  });

  it("Other action type", () => {
    const action = {
      type: "test"
    };
    expect(searchResults(initialState, action)).toEqual(initialState);
  });
});

const state = {
  searchResults: [{ _id: "1" }]
};

describe("searchResults - Selectors", () => {
  it("getResults", () => {
    expect(getResults({})).toEqual(initialState); // empty state
    expect(getResults(state)).toEqual(state.searchResults);
  });
});
