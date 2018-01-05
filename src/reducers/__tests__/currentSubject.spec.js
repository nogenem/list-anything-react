import {
  SUBJECT_FETCHED_BY_ID,
  SUBJECT_FETCHED_BY_TABID,
  SUBJECT_DELETED,
  USER_LOGGED_OUT
} from "../../constants/actionTypes";
import currentSubject, {
  initialState,
  getSubject,
  getSubjectDescription,
  getSubjectId,
  getTabsHash,
  getTabsArray,
  getFieldsHash,
  getFieldsArray
} from "../currentSubject";

const data = {
  entities: {
    subject: {
      "1": {
        _id: "1",
        description: "test"
      }
    },
    tabs: {},
    fields: {}
  }
};

describe("currentSubject - Reducer", () => {
  it("SUBJECT_FETCHED_BY_ID", () => {
    const action = {
      type: SUBJECT_FETCHED_BY_ID,
      data
    };
    const newState = currentSubject(initialState, action);
    expect(newState._id).toBe("1");
    expect(newState.description).toBe("test");
  });

  it("SUBJECT_FETCHED_BY_TABID", () => {
    const action = {
      type: SUBJECT_FETCHED_BY_TABID,
      data
    };
    const newState = currentSubject(initialState, action);
    expect(newState._id).toBe("1");
    expect(newState.description).toBe("test");
  });

  it("SUBJECT_DELETED", () => {
    const action = {
      type: SUBJECT_DELETED
    };
    expect(currentSubject(initialState, action)).toEqual(initialState);
  });

  it("USER_LOGGED_OUT", () => {
    const action = {
      type: USER_LOGGED_OUT
    };
    expect(currentSubject(initialState, action)).toEqual(initialState);
  });

  it("Other action type", () => {
    const action = {
      type: "test"
    };
    expect(currentSubject(initialState, action)).toEqual(initialState);
  });
});

const state = {
  currentSubject: {
    _id: "1",
    description: "test",
    tabs: {},
    fields: {}
  }
};

describe("currentSubject - Selectors", () => {
  it("getSubject", () => {
    expect(getSubject({})).toEqual(initialState); // empty state
    expect(getSubject(state)).toEqual(state.currentSubject);
  });

  it("getSubjectDescription", () => {
    expect(getSubjectDescription({})).toEqual(""); // empty state
    expect(getSubjectDescription(state)).toEqual(
      state.currentSubject.description
    );
  });

  it("getSubjectId", () => {
    expect(getSubjectId({})).toEqual(""); // empty state
    expect(getSubjectId(state)).toEqual(state.currentSubject._id);
  });

  it("getTabsHash", () => {
    expect(getTabsHash({})).toEqual({}); // empty state
    expect(getTabsHash(state)).toEqual(state.currentSubject.tabs);
  });

  it("getTabsArray", () => {
    expect(getTabsArray({})).toEqual([]); // empty state
    expect(getTabsArray(state)).toEqual([]);
  });

  it("getFieldsHash", () => {
    expect(getFieldsHash({})).toEqual({}); // empty state
    expect(getFieldsHash(state)).toEqual(state.currentSubject.tabs);
  });

  it("getFieldsArray", () => {
    expect(getFieldsArray({})).toEqual([]); // empty state
    expect(getFieldsArray(state)).toEqual([]);
  });
});
