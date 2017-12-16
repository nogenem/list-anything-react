import api from "../api";
import { userLoggedIn } from "./auth";
import setAuthorizationHeader from "../utils/setAuthorizationHeader";

const signup = data => dispatch =>
  api.user.signup(data).then(user => {
    localStorage.listanythingJWT = user.token;
    setAuthorizationHeader(user.token);
    dispatch(userLoggedIn(user));
  });

export default signup;
