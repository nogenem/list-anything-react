import { combineReducers } from "redux";

import user from "./reducers/user";
import subjects from "./reducers/subjects";
import subject from "./reducers/subject";

export default combineReducers({
  user,
  subjects,
  subject
});
