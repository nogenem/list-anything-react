import { createSelector } from "reselect";
import forEach from "lodash.foreach";

import {
  SUBJECT_DATA_FETCHED,
  SUBJECT_FETCHED_BY_ID,
  SUBJECT_DATA_EDITED,
  USER_LOGGED_OUT
} from "../constants/actionTypes";

// Muda a sub-array data para um objeto aonde as keys
// são os fieldId de cada dado de campo.
// Isso ajuda na hora de apresentar os dados na forma de tabela
// na classe SubjectDataTable, por exemplo.
const reshapeData = ({ subjectData: sData }) => {
  const values = Object.values(sData || {});
  const result = {};
  forEach(values, v => {
    const ret = { _id: v._id, tabId: v.tabId, data: {} };
    forEach(Object.values(v.data), e => {
      ret.data[e.fieldId] = e;
    });
    result[v._id] = ret;
  });
  return result;
};

export const initialState = {};

export default function subjectData(state = initialState, action = {}) {
  switch (action.type) {
    case SUBJECT_DATA_FETCHED:
    case SUBJECT_DATA_EDITED:
      return { ...state, ...reshapeData(action.data.entities) };
    case SUBJECT_FETCHED_BY_ID:
      return initialState;
    case USER_LOGGED_OUT:
      return initialState;
    default:
      return state;
  }
}

// SELECTORS
export const getSubjectData = state => state.subjectData || initialState;
const getParamsId = (_, props) => props.match.params._id;

export const getSubjectDataElem = createSelector(
  getSubjectData,
  getParamsId,
  (data, _id) => data[_id] || {}
);
export const getSubjectDataArray = createSelector(getSubjectData, dataHash =>
  Object.values(dataHash)
);
