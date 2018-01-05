import { createSelector } from "reselect";

import { USER_LOGGED_IN, USER_LOGGED_OUT } from "../constants/actionTypes";

export const initialState = {};

export default function user(state = initialState, action = {}) {
  switch (action.type) {
    case USER_LOGGED_IN:
      return action.user;
    case USER_LOGGED_OUT:
      return initialState;
    default:
      return state;
  }
}

// SELECTORS
export const getUser = state => state.user || initialState;
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
