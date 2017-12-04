import { createSelector } from "reselect";

import { SUBJECT_DATA_FETCHED, SUBJECT_FETCHED } from "../types";

export default function subjectData(state = {}, action = {}) {
  switch (action.type) {
    case SUBJECT_DATA_FETCHED:
      return { ...state, ...action.data.entities.subjectData };
    case SUBJECT_FETCHED:
      return {};
    default:
      return state;
  }
}

// SELECTORS
export const getSubjectData = state => state.subjectData;
export const getSubjectDataArray = createSelector(getSubjectData, dataHash =>
  Object.values(dataHash || {})
);
