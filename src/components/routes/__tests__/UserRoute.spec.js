import configureStore from "redux-mock-store";

import ConnectedUserRoute, { UnconnectedUserRoute } from "../UserRoute";

const setup = (propOverrides = {}) => {
  const props = {
    component: () => "Testando...",
    isAuthenticated: false,
    ...propOverrides
  };

  return {
    props,
    connectedWrapperShallow: wrapperShallow(ConnectedUserRoute, props, true),
    // Lembrar de sempre chamar `unmount` quando usar esse wrapper \/
    wrapperMount: wrapperMount(UnconnectedUserRoute, props, true)
  };
};

describe("ConnectedUserRoute", () => {
  const mockStore = configureStore();
  const state = {};

  it("renders correctly", () => {
    const { connectedWrapperShallow: wrapper } = setup({
      store: mockStore(state)
    });
    expect(wrapper()).toMatchSnapshot();
  });
});

describe("UnconnectedUserRoute", () => {
  it("renders correctly when `isAuthenticated` is false", () => {
    const { wrapperMount: wrapper } = setup({ isAuthenticated: false });
    expect(wrapper()).toMatchSnapshot();

    wrapper().unmount();
  });

  it("renders correctly when `isAuthenticated` is true", () => {
    const { wrapperMount: wrapper } = setup({ isAuthenticated: true });
    expect(wrapper()).toMatchSnapshot();

    wrapper().unmount();
  });
});
