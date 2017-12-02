import { normalize } from "normalizr";
import { SUBJECTS_FETCHED, SUBJECT_CREATED } from "../types";
import api from "../api";
import { subjectSchema } from "../schemas";

// data.entities.subjects
const subjectsFetched = data => ({
  type: SUBJECTS_FETCHED,
  data
});

const subjectCreated = data => ({
  type: SUBJECT_CREATED,
  data
});

export const fetchSubjects = () => dispatch =>
  api.subjects
    .fetchAll()
    .then(subjects =>
      dispatch(subjectsFetched(normalize(subjects, [subjectSchema])))
    );

export const createSubject = data => dispatch =>
  api.subjects
    .create(data)
    .then(subject =>
      dispatch(subjectCreated(normalize(subject, subjectSchema)))
    );
