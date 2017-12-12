import { normalize } from "normalizr";

import { SEARCH_RESULTS } from "../constants/actionTypes";
import api from "../api";
import { subjectDataSchema } from "../schemas";

const searchResults = data => ({
  type: SEARCH_RESULTS,
  data
});

const requestSearch = query => dispatch =>
  api.subjectData
    .search(query)
    .then(resData =>
      dispatch(searchResults(normalize(resData, [subjectDataSchema])))
    );

export default requestSearch;
