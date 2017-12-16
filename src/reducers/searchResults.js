import { SEARCH_RESULTS, USER_LOGGED_OUT } from "../constants/actionTypes";

export default function user(state = [], action = {}) {
  switch (action.type) {
    case SEARCH_RESULTS:
      return action.data;
    case USER_LOGGED_OUT:
      return {};
    default:
      return state;
  }
}

// SELECTORS
export const getResults = state => state.searchResults;
