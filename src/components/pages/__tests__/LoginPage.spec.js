import configureStore from "redux-mock-store";

import ConnectedLoginPage, { UnconnectedLoginPage } from "../LoginPage";

const testData = {
  formData: {}
};

const setup = (propOverrides = {}) => {
  const props = {
    history: {
      push: jest.fn()
    },
    login: jest.fn(() => Promise.resolve()),
    ...propOverrides
  };

  return {
    props,
    connectedWrapperShallow: wrapperShallow(ConnectedLoginPage, props),
    wrapperShallow: wrapperShallow(UnconnectedLoginPage, props)
  };
};

describe("ConnectedLoginPage", () => {
  const mockStore = configureStore();
  const state = {};
  it("renders correctly", () => {
    const { connectedWrapperShallow: wrapper } = setup({
      store: mockStore(state)
    });
    expect(wrapper()).toMatchSnapshot();
  });
});

describe("UnconnectedLoginPage", () => {
  it("renders correctly", () => {
    const { wrapperShallow: wrapper } = setup();
    expect(wrapper()).toMatchSnapshot();
  });

  it("calls `login` and `history.push` when calling `submit`", done => {
    const { wrapperShallow: wrapper, props } = setup();

    wrapper()
      .instance()
      .submit(testData.formData);

    expect(props.login).toHaveBeenCalledWith(testData.formData);
    setImmediate(() => {
      expect(props.history.push).toHaveBeenCalledWith("/dashboard");
      done();
    });
  });
});
