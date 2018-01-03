import React from "react";
import configureStore from "redux-mock-store";

import ConnectedHomePage, { UnconnectedHomePage } from "../HomePage";

describe("ConnectedHomePage", () => {
  const mockStore = configureStore();
  const initialState = {};
  const props = { store: mockStore(initialState) };

  it("renders correctly", () => {
    const wrapper = shallowWithContext(<ConnectedHomePage {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe("UnconnectedHomePage", () => {
  const props = {
    isAuthenticated: false
  };

  describe("when `isAuthenticated` is false", () => {
    it("renders correctly", () => {
      props.isAuthenticated = false;
      const wrapper = shallowWithContext(<UnconnectedHomePage {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe("when `isAuthenticated` is true", () => {
    it("renders correctly", () => {
      props.isAuthenticated = true;
      const wrapper = shallowWithContext(<UnconnectedHomePage {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
