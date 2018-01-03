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

export default function currentSubject(state = {}, action = {}) {
  switch (action.type) {
    case SUBJECT_FETCHED_BY_ID:
    case SUBJECT_FETCHED_BY_TABID:
      return reshapeSubject(action.data.entities);
    case SUBJECT_DELETED:
      return {};
    case USER_LOGGED_OUT:
      return {};
    default:
      return state;
  }
}

// SELECTORS
export const getSubject = state => state.currentSubject || {};
export const getSubjectDescription = createSelector(
  getSubject,
  subject => subject.description || ""
);
export const getSubjectId = createSelector(
  getSubject,
  subject => subject._id || ""
);
export const getTabsArray = state =>
  Object.values(getSubject(state).tabs || {});
export const getFieldsArray = state =>
  Object.values(getSubject(state).fields || {});
export const getFieldsHash = createSelector(
  getSubject,
  subject => subject.fields || {}
);
