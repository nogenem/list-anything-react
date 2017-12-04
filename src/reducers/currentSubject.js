import { createSelector } from "reselect";

import { SUBJECT_FETCHED } from "../types";

const reshapeSubject = ({ subject: subjectHash, tabs, fields }) => {
  const subject = Object.values(subjectHash)[0];
  return { _id: subject._id, description: subject.description, tabs, fields };
};

export default function currentSubject(state = {}, action = {}) {
  switch (action.type) {
    case SUBJECT_FETCHED:
      return reshapeSubject(action.data.entities);
    default:
      return state;
  }
}

// SELECTORS
export const getSubject = state => state.currentSubject;
export const getSubjectDescription = createSelector(
  getSubject,
  subject => subject.description || ""
);
export const getSubjectId = createSelector(
  getSubject,
  subject => subject._id || ""
);
export const getTabsArray = state =>
  Object.values(state.currentSubject.tabs || {});
export const getFieldsArray = state =>
  Object.values(state.currentSubject.fields || {});
