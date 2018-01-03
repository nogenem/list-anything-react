import React from "react";
import configureStore from "redux-mock-store";

import ConnectedUserRoute, { UnconnectedUserRoute } from "../UserRoute";

const defaultProps = {
  component: () => <span>Testando...</span>
};

describe("ConnectedUserRoute", () => {
  const mockStore = configureStore();
  const initialState = {};
  const props = { ...defaultProps, store: mockStore(initialState) };

  it("renders correctly", () => {
    const wrapper = shallowWithContext(<ConnectedUserRoute {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe("UnconnectedUserRoute", () => {
  const props = {
    ...defaultProps
  };

  describe("when `isAuthenticated` is false", () => {
    it("renders correctly", () => {
      props.isAuthenticated = false;
      const wrapper = mountWithContext(<UnconnectedUserRoute {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe("when `isAuthenticated` is true", () => {
    it("renders correctly", () => {
      props.isAuthenticated = true;
      const wrapper = mountWithContext(<UnconnectedUserRoute {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
