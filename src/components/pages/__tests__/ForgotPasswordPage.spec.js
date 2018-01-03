import React from "react";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

import ConnectedForgotPasswordPage, {
  UnconnectedForgotPasswordPage
} from "../ForgotPasswordPage";

describe("ConnectedForgotPasswordPage", () => {
  const mockStore = configureStore([thunk]);
  const initialState = {};
  const props = { store: mockStore(initialState) };

  it("renders correctly", () => {
    const wrapper = shallowWithContext(
      <ConnectedForgotPasswordPage {...props} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});

describe("UnconnectedForgotPasswordPage", () => {
  const props = {
    resetPasswordRequest: () => Promise.resolve()
  };

  it("renders correctly", () => {
    const wrapper = shallowWithContext(
      <UnconnectedForgotPasswordPage {...props} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
