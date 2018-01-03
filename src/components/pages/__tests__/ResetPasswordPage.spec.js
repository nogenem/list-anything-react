import React from "react";
import configureStore from "redux-mock-store";

import ConnectedResetPasswordPage, {
  UnconnectedResetPasswordPage
} from "../ResetPasswordPage";

const defaultProps = {
  history: {
    push: () => {}
  },
  match: {
    params: {
      token: "some token"
    }
  }
};

describe("ConnectedResetPasswordPage", () => {
  const mockStore = configureStore();
  const initialState = {};
  const props = { ...defaultProps, store: mockStore(initialState) };

  it("renders correctly", () => {
    const wrapper = shallowWithContext(
      <ConnectedResetPasswordPage {...props} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});

describe("UnconnectedResetPasswordPage", () => {
  const props = {
    ...defaultProps,
    validateToken: () => Promise.resolve(),
    resetPassword: () => Promise.resolve()
  };

  it("renders correctly", () => {
    const wrapper = shallowWithContext(
      <UnconnectedResetPasswordPage {...props} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
