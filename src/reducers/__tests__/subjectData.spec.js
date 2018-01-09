import {
  SUBJECT_DATA_FETCHED,
  SUBJECT_FETCHED_BY_ID,
  SUBJECT_DATA_EDITED,
  SUBJECT_DATA_CREATED,
  SUBJECT_DATA_DELETED,
  USER_LOGGED_OUT
} from "../../constants/actionTypes";

import subjectData, {
  initialState,
  getSubjectData,
  getSubjectDataElem,
  getSubjectDataArray
} from "../subjectData";

const ids = {
  sdId: "1",
  tabId: "2",
  fieldId: "3",
  valueId: "4"
};

const data = {
  entities: {
    subjectData: {
      [ids.sdId]: {
        _id: ids.sdId,
        tabId: ids.tabId,
        data: {
          [ids.fieldId]: {
            _id: ids.valueId,
            fieldId: ids.fieldId
          }
        }
      }
    },
    tabs: {},
    fields: {}
  }
};

const expectedData = {
  [ids.sdId]: {
    _id: ids.sdId,
    data: { [ids.fieldId]: { _id: ids.valueId, fieldId: ids.fieldId } },
    tabId: ids.tabId
  }
};

describe("subjectData - Reducer", () => {
  it("SUBJECT_DATA_FETCHED", () => {
    const action = {
      type: SUBJECT_DATA_FETCHED,
      data
    };
    const newState = subjectData(initialState, action);
    expect(newState).toEqual(expectedData);
  });

  it("SUBJECT_DATA_EDITED", () => {
    const action = {
      type: SUBJECT_DATA_EDITED,
      data
    };
    const newState = subjectData(initialState, action);
    expect(newState).toEqual(expectedData);
  });

  it("SUBJECT_DATA_CREATED", () => {
    const action = {
      type: SUBJECT_DATA_CREATED,
      data
    };
    const newState = subjectData(initialState, action);
    expect(newState).toEqual(expectedData);
  });

  it("SUBJECT_FETCHED_BY_ID", () => {
    const action = {
      type: SUBJECT_FETCHED_BY_ID
    };
    expect(subjectData(initialState, action)).toEqual(initialState);
  });

  it("SUBJECT_DATA_DELETED", () => {
    const action = {
      type: SUBJECT_DATA_DELETED,
      data: { _id: ids.sdId }
    };
    const newState = subjectData({ ...initialState, ...expectedData }, action);
    expect(newState).toEqual(initialState);
  });

  it("USER_LOGGED_OUT", () => {
    const action = {
      type: USER_LOGGED_OUT
    };
    expect(subjectData(initialState, action)).toEqual(initialState);
  });

  it("Other action type", () => {
    const action = {
      type: "test"
    };
    expect(subjectData(initialState, action)).toEqual(initialState);
  });
});

const state = {
  subjectData: expectedData
};

const props = {
  match: {
    params: {
      _id: ids.sdId
    }
  }
};

describe("subjectData - Selectors", () => {
  it("getSubjectData", () => {
    expect(getSubjectData({})).toEqual(initialState); // empty state
    expect(getSubjectData(state)).toEqual(state.subjectData);
  });

  it("getSubjectDataElem", () => {
    expect(getSubjectDataElem({}, props)).toEqual(initialState); // empty state
    expect(getSubjectDataElem(state, props)).toEqual(
      state.subjectData[ids.sdId]
    );
  });

  it("getSubjectDataArray", () => {
    expect(getSubjectDataArray({})).toEqual([]); // empty state
    expect(getSubjectDataArray(state)).toEqual([state.subjectData[ids.sdId]]);
  });
});
