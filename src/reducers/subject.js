import { SUBJECT_FETCHED, SUBJECT_DATA_FETCHED } from "../types";

export default function subject(state = {}, action = {}) {
  switch (action.type) {
    case SUBJECT_FETCHED:
      return action.data;
    case SUBJECT_DATA_FETCHED:
      return { ...state, data: action.data };
    default:
      return state;
  }
}
