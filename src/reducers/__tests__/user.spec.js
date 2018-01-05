import { USER_LOGGED_IN, USER_LOGGED_OUT } from "../../constants/actionTypes";
import user, {
  initialState,
  getUser,
  getEmail,
  getConfirmed,
  getToken
} from "../user";

const testUser = {
  email: "test@test.com",
  token: "123456789",
  confirmed: true
};

describe("user - Reducer", () => {
  it("USER_LOGGED_IN", () => {
    const action = {
      type: USER_LOGGED_IN,
      user: testUser
    };
    const newState = user(initialState, action);
    expect(newState).toEqual(testUser);
  });

  it("USER_LOGGED_OUT", () => {
    const action = {
      type: USER_LOGGED_OUT
    };
    expect(user(initialState, action)).toEqual(initialState);
  });

  it("Other action type", () => {
    const action = {
      type: "test"
    };
    expect(user(initialState, action)).toEqual(initialState);
  });
});

const state = {
  user: testUser
};

describe("user - Selectors", () => {
  it("getUser", () => {
    expect(getUser({})).toEqual(initialState); // empty state
    expect(getUser(state)).toEqual(state.user);
  });

  it("getEmail", () => {
    expect(getEmail({})).toEqual(""); // empty state
    expect(getEmail(state)).toEqual(state.user.email);
  });

  it("getConfirmed", () => {
    expect(getConfirmed({})).toEqual(false); // empty state
    expect(getConfirmed(state)).toEqual(state.user.confirmed);
  });

  it("getToken", () => {
    expect(getToken({})).toEqual(""); // empty state
    expect(getToken(state)).toEqual(state.user.token);
  });
});
