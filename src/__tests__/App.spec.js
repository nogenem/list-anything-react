import React from "react";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

import ConnectedApp, { UnconnectedApp } from "../App";

const defaultProps = {
  history: {
    push: () => {}
  },
  location: {
    pathname: ""
  }
};

describe("ConnectedApp", () => {
  const mockStore = configureStore([thunk]);
  const initialState = {};
  const props = { ...defaultProps, store: mockStore(initialState) };

  it("renders correctly", () => {
    const wrapper = shallowWithContext(<ConnectedApp {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe("UnconnectedApp", () => {
  const props = {
    ...defaultProps,
    isAuthenticated: false,
    fetchAllSubjects: () => {}
  };

  describe("when `isAuthenticated` is false", () => {
    it("renders correctly", () => {
      props.isAuthenticated = false;

      const wrapper = shallowWithContext(<UnconnectedApp {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
