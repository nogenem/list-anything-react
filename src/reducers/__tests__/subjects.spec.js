import {
  SUBJECTS_FETCHED,
  SUBJECT_CREATED,
  SUBJECT_DELETED,
  USER_LOGGED_OUT
} from "../../constants/actionTypes";

import subjects, {
  initialState,
  getSubjects,
  getSubjectsArray
} from "../subjects";

const ids = {
  subjectId: "1"
};

const data = {
  entities: {
    subjects: {
      [ids.subjectId]: {
        _id: ids.subjectId,
        description: "test"
      }
    }
  }
};

const expectedData = {
  [ids.subjectId]: {
    _id: ids.subjectId,
    description: "test"
  }
};

describe("subjects - Reducer", () => {
  it("SUBJECTS_FETCHED", () => {
    const action = {
      type: SUBJECTS_FETCHED,
      data
    };
    const newState = subjects(initialState, action);
    expect(newState).toEqual(expectedData);
  });

  it("SUBJECT_CREATED", () => {
    const action = {
      type: SUBJECT_CREATED,
      data
    };
    const newState = subjects(initialState, action);
    expect(newState).toEqual(expectedData);
  });

  it("SUBJECT_DELETED", () => {
    const action = {
      type: SUBJECT_DELETED,
      data: {
        _id: ids.subjectId
      }
    };
    const newState = subjects(initialState, action);
    expect(newState).toEqual(initialState);
  });

  it("USER_LOGGED_OUT", () => {
    const action = {
      type: USER_LOGGED_OUT
    };
    expect(subjects(initialState, action)).toEqual(initialState);
  });

  it("Other action type", () => {
    const action = {
      type: "test"
    };
    expect(subjects(initialState, action)).toEqual(initialState);
  });
});

const state = {
  subjects: expectedData
};

describe("subjects - Selectors", () => {
  it("getSubjects", () => {
    expect(getSubjects({})).toEqual(initialState); // empty state
    expect(getSubjects(state)).toEqual(state.subjects);
  });

  it("getSubjectsArray", () => {
    expect(getSubjectsArray({})).toEqual([]); // empty state
    expect(getSubjectsArray(state)).toEqual([state.subjects[ids.subjectId]]);
  });
});
