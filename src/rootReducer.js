import { combineReducers } from "redux";

import user from "./reducers/user";
import subjects from "./reducers/subjects";
import currentSubject from "./reducers/currentSubject";
import subjectData from "./reducers/subjectData";
import searchResults from "./reducers/searchResults";

export default combineReducers({
  user,
  subjects,
  currentSubject,
  subjectData,
  searchResults
});
