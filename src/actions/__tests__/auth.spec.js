import axios from "axios";

import { USER_LOGGED_IN, USER_LOGGED_OUT } from "../../constants/actionTypes";
import {
  login,
  logout,
  confirm,
  resetPasswordRequest,
  validateToken,
  resetPassword
} from "../auth";

jest.mock("../../api", () => ({
  __esModule: true,
  default: {
    user: {
      login: user => {
        expect(user).toEqual({
          // user
          email: "test@test.com",
          password: "123"
        });
        return Promise.resolve({
          email: user.email,
          token: "123456789" // testUserToken
        });
      },
      confirm: token => {
        expect(token).toBe("1234567890"); // testConfirmToken
        return Promise.resolve({
          email: "test@test.com", // user.email
          token: "123456789" // testUserToken
        });
      },
      resetPasswordRequest: email => {
        expect(email).toBe("test@test.com"); // user.email
        return Promise.resolve();
      },
      validateToken: token => {
        expect(token).toBe("0123456789"); // testResetPasswordToken
        return Promise.resolve();
      },
      resetPassword: data => {
        expect(data).toEqual({
          // resetPasswordData
          token: "0123456789",
          password: "1234",
          passwordConfirmation: "1234"
        });
        return Promise.resolve();
      }
    }
  }
}));

const user = {
  email: "test@test.com",
  password: "123"
};
const testResetPasswordToken = "0123456789";
const resetPasswordData = {
  token: testResetPasswordToken,
  password: "1234",
  passwordConfirmation: "1234"
};
const testUserToken = "123456789";
const testConfirmToken = "1234567890";

describe("auth actions", () => {
  it("login", async () => {
    expect.assertions(6);
    const dispatch = action => {
      expect(action.type).toBe(USER_LOGGED_IN);
      expect(action.user.email).toBe(user.email);
      expect(action.user.token).toBe(testUserToken);
      expect(localStorage.getItem("listanythingJWT")).toBe(testUserToken);
    };

    await login(user)(dispatch);
    expect(axios.defaults.headers.common.authorization).toBe(
      `Bearer ${testUserToken}`
    );
  });

  it("logout", async () => {
    expect.assertions(3);
    const dispatch = action => {
      expect(action.type).toBe(USER_LOGGED_OUT);
      expect(localStorage.getItem("listanythingJWT")).toEqual(null);
    };

    localStorage.setItem("listanythingJWT", testUserToken);
    await logout()(dispatch);
    expect(axios.defaults.headers.common.authorization).not.toBeDefined();
  });

  it("confirm", async () => {
    expect.assertions(4);
    const dispatch = action => {
      expect(action.type).toBe(USER_LOGGED_IN);
      expect(action.user.token).toBe(testUserToken);
      expect(localStorage.getItem("listanythingJWT")).toBe(testUserToken);
    };

    await confirm(testConfirmToken)(dispatch);
  });

  it("resetPasswordRequest", async () => {
    expect.assertions(1);
    await resetPasswordRequest(user)();
  });

  it("validateToken", async () => {
    expect.assertions(1);
    await validateToken(testResetPasswordToken)();
  });

  it("resetPassword", async () => {
    expect.assertions(1);
    await resetPassword(resetPasswordData)();
  });
});
