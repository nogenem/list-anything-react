import { combineReducers } from "redux";

import user from "./reducers/user";
import subjects from "./reducers/subjects";
import currentSubject from "./reducers/currentSubject";
import subjectData from "./reducers/subjectData";

export default combineReducers({
  user,
  subjects,
  currentSubject,
  subjectData
});
