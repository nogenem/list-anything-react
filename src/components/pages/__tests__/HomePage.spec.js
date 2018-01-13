import configureStore from "redux-mock-store";

import ConnectedHomePage, { UnconnectedHomePage } from "../HomePage";

const setup = (propOverrides = {}) => {
  const props = {
    isAuthenticated: false,
    ...propOverrides
  };

  return {
    props,
    connectedWrapperShallow: wrapperShallow(ConnectedHomePage, props, true),
    wrapperShallow: wrapperShallow(UnconnectedHomePage, props, true)
  };
};

describe("ConnectedHomePage", () => {
  const mockStore = configureStore();
  const state = {};
  it("renders correctly", () => {
    const { connectedWrapperShallow: wrapper } = setup({
      store: mockStore(state)
    });
    expect(wrapper()).toMatchSnapshot();
  });
});

describe("UnconnectedHomePage", () => {
  it("renders correctly when `isAuthenticated` is false", () => {
    const { wrapperShallow: wrapper } = setup();
    expect(wrapper()).toMatchSnapshot();
  });

  it("renders correctly when `isAuthenticated` is true", () => {
    const { wrapperShallow: wrapper } = setup({
      isAuthenticated: true
    });
    expect(wrapper()).toMatchSnapshot();
  });
});
