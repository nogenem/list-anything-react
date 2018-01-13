import configureStore from "redux-mock-store";

import ConnectedForgotPasswordPage, {
  UnconnectedForgotPasswordPage
} from "../ForgotPasswordPage";

const testData = {
  formData: {}
};

const setup = (propOverrides = {}) => {
  const props = {
    resetPasswordRequest: jest.fn(() => Promise.resolve()),
    ...propOverrides
  };

  return {
    props,
    connectedWrapperShallow: wrapperShallow(ConnectedForgotPasswordPage, props),
    wrapperShallow: wrapperShallow(UnconnectedForgotPasswordPage, props)
  };
};

describe("ConnectedForgotPasswordPage", () => {
  const mockStore = configureStore();
  const state = {};
  it("renders correctly", () => {
    const { connectedWrapperShallow: wrapper } = setup({
      store: mockStore(state)
    });
    expect(wrapper()).toMatchSnapshot();
  });
});

describe("UnconnectedForgotPasswordPage", () => {
  it("renders correctly", () => {
    const { wrapperShallow: wrapper } = setup();
    expect(wrapper()).toMatchSnapshot();
  });

  it("renders correctly when calling `submit`", done => {
    const { wrapperShallow: wrapper, props } = setup();

    wrapper()
      .instance()
      .submit(testData.formData);

    expect(props.resetPasswordRequest).toHaveBeenCalledWith(testData.formData);

    setImmediate(() => {
      wrapper().update();
      expect(wrapper()).toMatchSnapshot();
      done();
    });
  });
});
