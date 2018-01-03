import React from "react";
import configureStore from "redux-mock-store";

import ConnectedLoginPage, { UnconnectedLoginPage } from "../LoginPage";

const defaultProps = {
  history: {
    push: () => {}
  }
};

describe("ConnectedLoginPage", () => {
  const mockStore = configureStore();
  const initialState = {};
  const props = { ...defaultProps, store: mockStore(initialState) };

  it("renders correctly", () => {
    const wrapper = shallowWithContext(<ConnectedLoginPage {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe("UnconnectedLoginPage", () => {
  const props = {
    ...defaultProps,
    login: () => Promise.resolve()
  };

  it("renders correctly", () => {
    const wrapper = shallowWithContext(<UnconnectedLoginPage {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
