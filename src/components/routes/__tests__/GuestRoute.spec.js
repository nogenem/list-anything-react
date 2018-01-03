import React from "react";
import configureStore from "redux-mock-store";

import ConnectedGuestRoute, { UnconnectedGuestRoute } from "../GuestRoute";

const defaultProps = {
  component: () => <span>Testando...</span>
};

describe("ConnectedGuestRoute", () => {
  const mockStore = configureStore();
  const initialState = {};
  const props = { ...defaultProps, store: mockStore(initialState) };

  it("renders correctly", () => {
    const wrapper = shallowWithContext(<ConnectedGuestRoute {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe("UnconnectedGuestRoute", () => {
  const props = {
    ...defaultProps
  };

  describe("when `isAuthenticated` is false", () => {
    it("renders correctly", () => {
      props.isAuthenticated = false;
      const wrapper = mountWithContext(<UnconnectedGuestRoute {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe("when `isAuthenticated` is true", () => {
    it("renders correctly", () => {
      props.isAuthenticated = true;
      const wrapper = mountWithContext(<UnconnectedGuestRoute {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
