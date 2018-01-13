import configureStore from "redux-mock-store";

import ConnectedConfirmationPage, {
  UnconnectedConfirmationPage
} from "../ConfirmationPage";

const testData = {
  token: "some token"
};

const setup = (propOverrides = {}) => {
  const props = {
    match: { params: { token: testData.token } },
    confirm: jest.fn(() => Promise.resolve()),
    ...propOverrides
  };

  return {
    props,
    connectedWrapperShallow: wrapperShallow(ConnectedConfirmationPage, props),
    wrapperShallow: wrapperShallow(UnconnectedConfirmationPage, props)
  };
};

describe("ConnectedConfirmationPage", () => {
  const mockStore = configureStore();
  const state = {};
  it("renders correctly", () => {
    const { connectedWrapperShallow: wrapper } = setup({
      store: mockStore(state)
    });
    expect(wrapper()).toMatchSnapshot();
  });
});

describe("UnconnectedConfirmationPage", () => {
  it("renders correctly before `confirm` finishes", () => {
    const { wrapperShallow: wrapper, props } = setup();
    expect(wrapper()).toMatchSnapshot();
    expect(props.confirm).toHaveBeenCalledWith(testData.token);
  });

  it("renders correctly after `confirm` finishes successfully", done => {
    const { wrapperShallow: wrapper, props } = setup();

    wrapper();
    expect(props.confirm).toHaveBeenCalledWith(testData.token);

    setImmediate(() => {
      wrapper().update();
      expect(wrapper()).toMatchSnapshot();
      done();
    });
  });

  it("renders correctly after `confirm` finishes with failure", done => {
    const { wrapperShallow: wrapper, props } = setup({
      confirm: jest.fn(() => Promise.reject())
    });

    wrapper();
    expect(props.confirm).toHaveBeenCalledWith(testData.token);

    setImmediate(() => {
      wrapper().update();
      expect(wrapper()).toMatchSnapshot();
      done();
    });
  });
});
