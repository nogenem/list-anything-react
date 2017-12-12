import { normalize } from "normalizr";

import {
  SUBJECTS_FETCHED,
  SUBJECT_CREATED,
  SUBJECT_FETCHED_BY_ID,
  SUBJECT_FETCHED_BY_TABID,
  SUBJECT_DELETED
} from "../constants/actionTypes";
import api from "../api";
import { subjectsSchema, subjectSchema } from "../schemas";

const subjectsFetched = data => ({
  type: SUBJECTS_FETCHED,
  data
});

const subjectFetchedById = data => ({
  type: SUBJECT_FETCHED_BY_ID,
  data
});

const subjectFetchedByTabId = data => ({
  type: SUBJECT_FETCHED_BY_TABID,
  data
});

const subjectCreated = data => ({
  type: SUBJECT_CREATED,
  data
});

const subjectDeleted = data => ({
  type: SUBJECT_DELETED,
  data
});

export const fetchAllSubjects = () => dispatch =>
  api.subjects
    .fetchAll()
    .then(subjects =>
      dispatch(subjectsFetched(normalize(subjects, [subjectsSchema])))
    );

export const fetchSubjectById = _id => dispatch =>
  api.subjects
    .fetchById(_id)
    .then(subject =>
      dispatch(subjectFetchedById(normalize(subject, subjectSchema)))
    );

export const fetchSubjectByTabId = tabId => dispatch =>
  api.subjects
    .fetchByTabId(tabId)
    .then(subject =>
      dispatch(subjectFetchedByTabId(normalize(subject, subjectSchema)))
    );

export const createSubject = data => dispatch =>
  api.subjects
    .create(data)
    .then(subject =>
      dispatch(subjectCreated(normalize(subject, subjectsSchema)))
    );

export const deleteSubject = _id => dispatch =>
  api.subjects.delete(_id).then(res => dispatch(subjectDeleted(res)));
