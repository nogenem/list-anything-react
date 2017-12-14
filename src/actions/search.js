import { SEARCH_RESULTS } from "../constants/actionTypes";
import api from "../api";

const searchResults = data => ({
  type: SEARCH_RESULTS,
  data
});

const searchRequest = query => dispatch =>
  api.subjectData
    .search(query)
    .then(resData => dispatch(searchResults(resData)));

export default searchRequest;
