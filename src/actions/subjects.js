import { normalize } from "normalizr";
import { SUBJECTS_FETCHED } from "../types";
import api from "../api";
import { subjectSchema } from "../schemas";

// data.entities.subjects
const subjectsFetched = data => ({
  type: SUBJECTS_FETCHED,
  data
});

export const fetchSubjects = () => dispatch =>
  api.subjects
    .fetchAll()
    .then(subjects =>
      dispatch(subjectsFetched(normalize(subjects, [subjectSchema])))
    );
