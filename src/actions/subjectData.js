import { normalize } from "normalizr";
import forEach from "lodash.foreach";

import {
  SUBJECT_DATA_FETCHED,
  SUBJECT_DATA_CREATED,
  SUBJECT_DATA_EDITED,
  SUBJECT_DATA_DELETED
} from "../constants/actionTypes";
import api from "../api";
import { subjectDataSchema } from "../schemas";

const subjectDataCreated = data => ({
  type: SUBJECT_DATA_CREATED,
  data
});

const subjectDataFetched = data => ({
  type: SUBJECT_DATA_FETCHED,
  data
});

const subjectDataEdited = data => ({
  type: SUBJECT_DATA_EDITED,
  data
});

const subjectDataDeleted = data => ({
  type: SUBJECT_DATA_DELETED,
  data
});

export const fetchByTabId = tabId => dispatch =>
  api.subjectData
    .fetchByTabId(tabId)
    .then(data =>
      dispatch(subjectDataFetched(normalize(data, [subjectDataSchema])))
    );

export const fetchById = _id => dispatch =>
  api.subjectData
    .fetchById(_id)
    .then(data =>
      dispatch(subjectDataFetched(normalize(data, [subjectDataSchema])))
    );

const reshapeSubjectData = data => {
  const result = {
    tabId: data.tabId,
    data: []
  };
  const keys = Object.keys(data).splice(1); // retira o tabId
  forEach(keys, key => {
    result.data.push({
      fieldId: key,
      value: data[key]
    });
  });
  return result;
};

export const createSubjectData = data => dispatch => {
  const subjectData = reshapeSubjectData(data);
  return api.subjectData
    .create(subjectData)
    .then(resData =>
      dispatch(subjectDataCreated(normalize(resData, subjectDataSchema)))
    );
};

export const editSubjectData = (sdId, data) => dispatch =>
  api.subjectData
    .edit({ _id: sdId, data: { ...data } })
    .then(resData =>
      dispatch(subjectDataEdited(normalize(resData, [subjectDataSchema])))
    );

export const deleteSubjectData = sdId => dispatch =>
  api.subjectData
    .delete(sdId)
    .then(resData => dispatch(subjectDataDeleted(resData)));
