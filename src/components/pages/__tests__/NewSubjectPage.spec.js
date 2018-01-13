import configureStore from "redux-mock-store";

import ConnectedNewSubjectPage, {
  UnconnectedNewSubjectPage
} from "../NewSubjectPage";

const testData = {
  formData: {}
};

const setup = (propOverrides = {}) => {
  const props = {
    history: {
      push: jest.fn()
    },
    createSubject: jest.fn(() => Promise.resolve()),
    ...propOverrides
  };

  return {
    props,
    connectedWrapperShallow: wrapperShallow(ConnectedNewSubjectPage, props),
    wrapperShallow: wrapperShallow(UnconnectedNewSubjectPage, props)
  };
};

describe("ConnectedNewSubjectPage", () => {
  const mockStore = configureStore();
  const state = {};
  it("renders correctly", () => {
    const { connectedWrapperShallow: wrapper } = setup({
      store: mockStore(state)
    });
    expect(wrapper()).toMatchSnapshot();
  });
});

describe("UnconnectedNewSubjectPage", () => {
  it("renders correctly", () => {
    const { wrapperShallow: wrapper } = setup();
    expect(wrapper()).toMatchSnapshot();
  });

  it("calls `createSubject` and `history.push` when calling `submit`", done => {
    const { wrapperShallow: wrapper, props } = setup();

    wrapper()
      .instance()
      .submit(testData.formData);

    expect(props.createSubject).toHaveBeenCalledWith(testData.formData);
    setImmediate(() => {
      expect(props.history.push).toHaveBeenCalledWith("/dashboard");
      done();
    });
  });
});
