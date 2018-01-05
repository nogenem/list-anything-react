import { createSelector } from "reselect";

import {
  SUBJECT_FETCHED_BY_ID,
  SUBJECT_FETCHED_BY_TABID,
  SUBJECT_DELETED,
  USER_LOGGED_OUT
} from "../constants/actionTypes";

const reshapeSubject = ({ subject: subjectHash, tabs, fields }) => {
  const { _id, description } = Object.values(subjectHash)[0];
  return { _id, description, tabs, fields };
};

export const initialState = {};

export default function currentSubject(state = initialState, action = {}) {
  switch (action.type) {
    case SUBJECT_FETCHED_BY_ID:
    case SUBJECT_FETCHED_BY_TABID:
      return reshapeSubject(action.data.entities);
    case SUBJECT_DELETED:
      return initialState;
    case USER_LOGGED_OUT:
      return initialState;
    default:
      return state;
  }
}

// SELECTORS
export const getSubject = state => state.currentSubject || initialState;
export const getSubjectDescription = createSelector(
  getSubject,
  subject => subject.description || ""
);
export const getSubjectId = createSelector(
  getSubject,
  subject => subject._id || ""
);

export const getTabsHash = createSelector(
  getSubject,
  subject => subject.tabs || {}
);
export const getTabsArray = createSelector(getTabsHash, hash =>
  Object.values(hash)
);

export const getFieldsHash = createSelector(
  getSubject,
  subject => subject.fields || {}
);
export const getFieldsArray = createSelector(getFieldsHash, hash =>
  Object.values(hash)
);
