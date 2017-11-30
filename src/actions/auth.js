import { USER_LOGGED_IN } from "../types";
import api from "../api";
import setAuthorizationHeader from "../utils/setAuthorizationHeader";

export const userLoggedIn = user => ({
  type: USER_LOGGED_IN,
  user
});

export const login = credentials => dispatch =>
  api.user.login(credentials).then(user => {
    localStorage.listanythingJWT = user.token;
    setAuthorizationHeader(user.token);
    dispatch(userLoggedIn(user));
  });

export const confirm = token => dispatch =>
  api.user.confirm(token).then(user => {
    localStorage.listanythingJWT = user.token;
    dispatch(userLoggedIn(user));
  });
