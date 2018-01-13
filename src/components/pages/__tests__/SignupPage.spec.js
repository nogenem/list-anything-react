import configureStore from "redux-mock-store";

import ConnectedSignupPage, { UnconnectedSignupPage } from "../SignupPage";

const testData = {
  formData: {}
};

const setup = (propOverrides = {}) => {
  const props = {
    history: {
      push: jest.fn()
    },
    signup: jest.fn(() => Promise.resolve()),
    ...propOverrides
  };

  return {
    props,
    connectedWrapperShallow: wrapperShallow(ConnectedSignupPage, props),
    wrapperShallow: wrapperShallow(UnconnectedSignupPage, props)
  };
};

describe("ConnectedSignupPage", () => {
  const mockStore = configureStore();
  const state = {};
  it("renders correctly", () => {
    const { connectedWrapperShallow: wrapper } = setup({
      store: mockStore(state)
    });
    expect(wrapper()).toMatchSnapshot();
  });
});

describe("UnconnectedSignupPage", () => {
  it("renders correctly", () => {
    const { wrapperShallow: wrapper } = setup();
    expect(wrapper()).toMatchSnapshot();
  });

  it("calls `signup` and `history.push` when calling `submit`", done => {
    const { wrapperShallow: wrapper, props } = setup();

    wrapper()
      .instance()
      .submit(testData.formData);

    expect(props.signup).toHaveBeenCalledWith(testData.formData);
    setImmediate(() => {
      expect(props.history.push).toHaveBeenCalledWith("/dashboard");
      done();
    });
  });
});
