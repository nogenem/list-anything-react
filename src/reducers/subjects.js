import { createSelector } from "reselect";
import { SUBJECTS_FETCHED, SUBJECT_CREATED } from "../types";

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

export const subjectsSelector = state => state.subjects;

export const allSubjectsSelector = createSelector(
  subjectsSelector,
  subjectsHash => Object.values(subjectsHash)
);
