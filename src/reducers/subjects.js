import { createSelector } from "reselect";

import { SUBJECTS_FETCHED, SUBJECT_CREATED } from "../constants/actionTypes";

export default function subjects(state = {}, action = {}) {
  switch (action.type) {
    case SUBJECTS_FETCHED:
    case SUBJECT_CREATED:
      return { ...state, ...action.data.entities.subjects };
    default:
      return state;
  }
}

// SELECTORS
export const getSubjects = state => state.subjects;
export const getSubjectsArray = createSelector(getSubjects, subjectsHash =>
  Object.values(subjectsHash || {})
);
