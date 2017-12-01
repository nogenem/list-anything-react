import { combineReducers } from "redux";

import user from "./reducers/user";
import subjects from "./reducers/subjects";

export default combineReducers({
  user,
  subjects
});
