import { SEARCH_RESULTS } from "../constants/actionTypes";

export default function user(state = [], action = {}) {
  switch (action.type) {
    case SEARCH_RESULTS:
      return action.data;
    default:
      return state;
  }
}

// SELECTORS
export const getResults = state => state.searchResults;
