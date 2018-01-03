import React from "react";
import configureStore from "redux-mock-store";

import ConnectedSignupPage, { UnconnectedSignupPage } from "../SignupPage";

const defaultProps = {
  history: {
    push: () => {}
  }
};

describe("ConnectedSignupPage", () => {
  const mockStore = configureStore();
  const initialState = {};
  const props = { ...defaultProps, store: mockStore(initialState) };

  it("renders correctly", () => {
    const wrapper = shallowWithContext(<ConnectedSignupPage {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe("UnconnectedSignupPage", () => {
  const props = {
    ...defaultProps,
    signup: () => Promise.resolve()
  };

  it("renders correctly", () => {
    const wrapper = shallowWithContext(<UnconnectedSignupPage {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
