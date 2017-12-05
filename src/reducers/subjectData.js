import { createSelector } from "reselect";
import sortBy from "lodash.sortby";

import {
  SUBJECT_DATA_FETCHED,
  SUBJECT_FETCHED
} from "../constants/actionTypes";

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
export const getSubjectDataData = (state, fieldHash) => _id => {
  const dataObj = getSubjectData(state)[_id];
  return dataObj
    ? sortBy(dataObj.data, [o => fieldHash[o.fieldId].description])
    : [];
};
