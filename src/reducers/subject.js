import { SUBJECT_FETCHED } from "../types";

export default function subject(state = {}, action = {}) {
  switch (action.type) {
    case SUBJECT_FETCHED:
      return action.data;
    default:
      return state;
  }
}
