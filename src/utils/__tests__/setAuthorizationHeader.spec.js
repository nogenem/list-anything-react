import axios from "axios";

import setAuthorizationHeader from "../setAuthorizationHeader";

const testToken = "123456789";

afterAll(() => {
  setAuthorizationHeader(); // limpa o token
});

describe("setAuthorizationHeader", () => {
  it("sets header when passed a token", () => {
    setAuthorizationHeader(testToken);
    expect(axios.defaults.headers.common.authorization).toBe(
      `Bearer ${testToken}`
    );
  });

  it("removes header when a token is not passed", () => {
    setAuthorizationHeader(testToken);
    setAuthorizationHeader();
    expect(axios.defaults.headers.common.authorization).not.toBeDefined();
  });
});
