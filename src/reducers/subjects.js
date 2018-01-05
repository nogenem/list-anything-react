import { createSelector } from "reselect";

import {
  SUBJECTS_FETCHED,
  SUBJECT_CREATED,
  SUBJECT_DELETED,
  USER_LOGGED_OUT
} from "../constants/actionTypes";

export const initialState = {};

export default function subjects(state = initialState, action = {}) {
  switch (action.type) {
    case SUBJECTS_FETCHED:
    case SUBJECT_CREATED:
      return { ...state, ...action.data.entities.subjects };
    case SUBJECT_DELETED: {
      const newState = { ...state };
      delete newState[action.data._id];
      return newState;
    }
    case USER_LOGGED_OUT:
      return initialState;
    default:
      return state;
  }
}

// SELECTORS
export const getSubjects = state => state.subjects || initialState;
export const getSubjectsArray = createSelector(getSubjects, subjectsHash =>
  Object.values(subjectsHash)
);
