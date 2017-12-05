import { createSelector } from "reselect";

import { USER_LOGGED_IN, USER_LOGGED_OUT } from "../constants/actionTypes";

export default function user(state = {}, action = {}) {
  switch (action.type) {
    case USER_LOGGED_IN:
      return action.user;
    case USER_LOGGED_OUT:
      return {};
    default:
      return state;
  }
}

// SELECTORS
export const getUser = state => state.user;
export const getEmail = createSelector(
  getUser,
  userData => userData.email || ""
);
export const getConfirmed = createSelector(
  getUser,
  userData => userData.confirmed || false
);
export const getToken = createSelector(
  getUser,
  userData => userData.token || ""
);
