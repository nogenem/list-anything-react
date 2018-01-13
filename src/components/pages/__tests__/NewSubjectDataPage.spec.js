import configureStore from "redux-mock-store";

import ConnectedNewSubjectDataPage, {
  UnconnectedNewSubjectDataPage
} from "../NewSubjectDataPage";

const testData = {
  _id: "1",
  subjectId: "2",
  formData: {}
};

const setup = (propOverrides = {}) => {
  const props = {
    history: {
      push: jest.fn()
    },
    match: { params: { _id: testData._id } },
    subjectId: testData.subjectId,
    createSubjectData: jest.fn(() => Promise.resolve()),
    fetchSubjectById: jest.fn(() => Promise.resolve()),
    ...propOverrides
  };

  return {
    props,
    connectedWrapperShallow: wrapperShallow(ConnectedNewSubjectDataPage, props),
    wrapperShallow: wrapperShallow(UnconnectedNewSubjectDataPage, props)
  };
};

describe("ConnectedNewSubjectDataPage", () => {
  const mockStore = configureStore();
  const state = {};
  it("renders correctly", () => {
    const { connectedWrapperShallow: wrapper } = setup({
      store: mockStore(state)
    });
    expect(wrapper()).toMatchSnapshot();
  });
});

describe("UnconnectedNewSubjectDataPage", () => {
  it("renders correctly when `subjectId` is not empty", () => {
    const { wrapperShallow: wrapper } = setup();
    expect(wrapper()).toMatchSnapshot();
  });

  describe("when `subjectId` is empty", () => {
    it("renders correctly before `fetchSubjectById` finishes", () => {
      const { wrapperShallow: wrapper, props } = setup({
        subjectId: ""
      });
      expect(wrapper()).toMatchSnapshot();
      expect(props.fetchSubjectById).toHaveBeenCalledWith(testData._id);
    });

    it("renders correctly after `fetchSubjectById` finishes successfully", done => {
      const { wrapperShallow: wrapper, props } = setup({
        subjectId: ""
      });

      wrapper();
      expect(props.fetchSubjectById).toHaveBeenCalledWith(testData._id);

      setImmediate(() => {
        wrapper().update();
        expect(wrapper()).toMatchSnapshot();
        done();
      });
    });
  });

  it("calls `createSubjectData` and `history.push` when calling `submit`", done => {
    const { wrapperShallow: wrapper, props } = setup();

    wrapper()
      .instance()
      .submit(testData.formData);

    expect(props.createSubjectData).toHaveBeenCalledWith({
      subjectId: props.subjectId
    });
    setImmediate(() => {
      expect(props.history.push).toHaveBeenCalledWith(
        `/subject/${props.subjectId}`
      );
      done();
    });
  });
});
