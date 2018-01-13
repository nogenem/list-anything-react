import configureStore from "redux-mock-store";

import ConnectedResetPasswordPage, {
  UnconnectedResetPasswordPage
} from "../ResetPasswordPage";

const testData = {
  token: "some token",
  formData: {}
};

const setup = (propOverrides = {}) => {
  const props = {
    history: {
      push: jest.fn()
    },
    match: {
      params: {
        token: testData.token
      }
    },
    validateToken: jest.fn(() => Promise.resolve()),
    resetPassword: jest.fn(() => Promise.resolve()),
    ...propOverrides
  };

  return {
    props,
    connectedWrapperShallow: wrapperShallow(ConnectedResetPasswordPage, props),
    wrapperShallow: wrapperShallow(UnconnectedResetPasswordPage, props)
  };
};

describe("ConnectedResetPasswordPage", () => {
  const mockStore = configureStore();
  const state = {};
  it("renders correctly", () => {
    const { connectedWrapperShallow: wrapper } = setup({
      store: mockStore(state)
    });
    expect(wrapper()).toMatchSnapshot();
  });
});

describe("UnconnectedResetPasswordPage", () => {
  it("renders correctly before `validateToken` finishes", () => {
    const { wrapperShallow: wrapper, props } = setup();
    expect(wrapper()).toMatchSnapshot();
    expect(props.validateToken).toHaveBeenCalledWith(testData.token);
  });

  it("renders correctly after `validateToken` finishes successfully", done => {
    const { wrapperShallow: wrapper, props } = setup();

    wrapper();
    expect(props.validateToken).toHaveBeenCalledWith(testData.token);

    setImmediate(() => {
      wrapper().update();
      expect(wrapper()).toMatchSnapshot();
      done();
    });
  });

  it("renders correctly after `validateToken` finishes with failure", done => {
    const { wrapperShallow: wrapper, props } = setup({
      validateToken: jest.fn(() => Promise.reject())
    });

    wrapper();
    expect(props.validateToken).toHaveBeenCalledWith(testData.token);

    setImmediate(() => {
      wrapper().update();
      expect(wrapper()).toMatchSnapshot();
      done();
    });
  });

  it("calls `resetPassword` and `history.push` when calling `submit`", done => {
    const { wrapperShallow: wrapper, props } = setup();

    wrapper()
      .instance()
      .submit(testData.formData);

    expect(props.resetPassword).toHaveBeenCalledWith(testData.formData);
    setImmediate(() => {
      expect(props.history.push).toHaveBeenCalledWith("/login");
      done();
    });
  });
});
