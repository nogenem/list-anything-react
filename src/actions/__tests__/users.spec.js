import axios from "axios";

import { USER_LOGGED_IN } from "../../constants/actionTypes";
import signup from "../users";

jest.mock("../../api", () => ({
  __esModule: true,
  default: {
    user: {
      signup: user => {
        expect(user).toEqual({
          // user
          email: "test@test.com",
          password: "123"
        });
        return Promise.resolve({
          email: user.email,
          token: "123456789" // testUserToken
        });
      }
    }
  }
}));

const user = {
  email: "test@test.com",
  password: "123"
};
const testUserToken = "123456789";

describe("user actions", () => {
  it("signup", async () => {
    expect.assertions(6);
    const dispatch = action => {
      expect(action.type).toBe(USER_LOGGED_IN);
      expect(action.user.email).toBe(user.email);
      expect(action.user.token).toBe(testUserToken);
      expect(localStorage.getItem("listanythingJWT")).toBe(testUserToken);
    };

    await signup(user)(dispatch);
    expect(axios.defaults.headers.common.authorization).toBe(
      `Bearer ${testUserToken}`
    );
  });
});
