import configureStore from "redux-mock-store";

import ConnectedGuestRoute, { UnconnectedGuestRoute } from "../GuestRoute";

const setup = (propOverrides = {}) => {
  const props = {
    component: () => "Testando...",
    isAuthenticated: false,
    ...propOverrides
  };

  return {
    props,
    connectedWrapperShallow: wrapperShallow(ConnectedGuestRoute, props, true),
    // Lembrar de sempre chamar `unmount` quando usar esse wrapper \/
    wrapperMount: wrapperMount(UnconnectedGuestRoute, props, true)
  };
};

describe("ConnectedGuestRoute", () => {
  const mockStore = configureStore();
  const state = {};

  it("renders correctly", () => {
    const { connectedWrapperShallow: wrapper } = setup({
      store: mockStore(state)
    });
    expect(wrapper()).toMatchSnapshot();
  });
});

describe("UnconnectedGuestRoute", () => {
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
