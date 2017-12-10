import { createSelector } from "reselect";

import {
  SUBJECTS_FETCHED,
  SUBJECT_CREATED,
  SUBJECT_DELETED
} from "../constants/actionTypes";

export default function subjects(state = {}, action = {}) {
  switch (action.type) {
    case SUBJECTS_FETCHED:
    case SUBJECT_CREATED:
      return { ...state, ...action.data.entities.subjects };
    case SUBJECT_DELETED: {
      const newState = { ...state };
      delete newState[action.data._id];
      return newState;
    }
    default:
      return state;
  }
}

// SELECTORS
export const getSubjects = state => state.subjects;
export const getSubjectsArray = createSelector(getSubjects, subjectsHash =>
  Object.values(subjectsHash || {})
);
