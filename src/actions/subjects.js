import { normalize } from "normalizr";
import { SUBJECTS_FETCHED, SUBJECT_CREATED, SUBJECT_FETCHED } from "../types";
import api from "../api";
import { subjectsSchema } from "../schemas";

const subjectsFetched = data => ({
  type: SUBJECTS_FETCHED,
  data
});

const subjectCreated = data => ({
  type: SUBJECT_CREATED,
  data
});

const subjectFetched = data => ({
  type: SUBJECT_FETCHED,
  data
});

export const fetchSubjects = () => dispatch =>
  api.subjects
    .fetchAll()
    .then(subjects =>
      dispatch(subjectsFetched(normalize(subjects, [subjectsSchema])))
    );

export const createSubject = data => dispatch =>
  api.subjects
    .create(data)
    .then(subject =>
      dispatch(subjectCreated(normalize(subject, subjectsSchema)))
    );

export const fetchSubjectData = (_id = null) => (dispatch, getState) => {
  let id = _id;
  if (id === null) {
    const { subject } = getState();
    id = subject.tabs[0]._id;
  }
  api.subjects.fetchSubjectData(id).then(data => console.log("Data:", data));
};

export const fetchSubject = _id => dispatch =>
  api.subjects
    .fetchSubject(_id)
    .then(subject => dispatch(subjectFetched(subject)));
