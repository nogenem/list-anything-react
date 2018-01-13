import configureStore from "redux-mock-store";

import ConnectedSubjectDataPage, {
  UnconnectedSubjectDataPage
} from "../SubjectDataPage";

const testData = {
  params_id: "1",
  subjectId: "4",
  subjectData: {
    _id: "2",
    tabId: "3"
  },
  server_error: {
    response: {
      status: 500
    }
  },
  formData: {}
};

const setup = (propOverrides = {}) => {
  const props = {
    history: {
      push: jest.fn()
    },
    match: { params: { _id: testData.params_id } },
    subjectData: testData.subjectData,
    fields: [],
    tabs: [],
    currentSubjectId: testData.subjectId,
    fetchSDById: jest.fn(() => Promise.resolve()),
    fetchSubjectByTabId: jest.fn(() => Promise.resolve()),
    editSubjectData: jest.fn(() => Promise.resolve()),
    deleteSubjectData: jest.fn(() => Promise.resolve()),
    ...propOverrides
  };

  return {
    props,
    connectedWrapperShallow: wrapperShallow(ConnectedSubjectDataPage, props),
    wrapperShallow: wrapperShallow(UnconnectedSubjectDataPage, props)
  };
};

describe("ConnectedSubjectDataPage", () => {
  const mockStore = configureStore();
  const state = {};
  it("renders correctly", () => {
    const { connectedWrapperShallow: wrapper } = setup({
      store: mockStore(state)
    });
    expect(wrapper()).toMatchSnapshot();
  });
});

describe("UnconnectedSubjectDataPage", () => {
  it("renders correctly when `subjectData._id` is not empty", () => {
    const { wrapperShallow: wrapper } = setup();
    expect(wrapper()).toMatchSnapshot();
  });

  describe("when `subjectData._id` is empty", () => {
    it("renders correctly before `fetchSDById` finishes", () => {
      const { wrapperShallow: wrapper, props } = setup({
        subjectData: {}
      });
      expect(wrapper()).toMatchSnapshot();
      expect(props.fetchSDById).toHaveBeenCalledWith(testData.params_id);
    });

    it("renders correctly after `fetchSDById` and `fetchSubjectByTabId` finishes successfully", done => {
      const { wrapperShallow: wrapper, props } = setup({
        subjectData: { tabId: testData.subjectData.tabId }
      });

      wrapper();
      expect(props.fetchSDById).toHaveBeenCalledWith(testData.params_id);

      setImmediate(() => {
        wrapper().update();
        expect(wrapper()).toMatchSnapshot();
        expect(props.fetchSubjectByTabId).toHaveBeenCalledWith(
          testData.subjectData.tabId
        );
        done();
      });
    });

    it("renders correctly after `fetchSDById` finishes with failure", done => {
      const { wrapperShallow: wrapper, props } = setup({
        subjectData: { tabId: testData.subjectData.tabId },
        fetchSDById: jest.fn(() => Promise.reject(testData.server_error))
      });

      wrapper();
      expect(props.fetchSDById).toHaveBeenCalledWith(testData.params_id);

      setImmediate(() => {
        wrapper().update();
        expect(wrapper()).toMatchSnapshot();
        expect(props.fetchSubjectByTabId).not.toHaveBeenCalled();
        done();
      });
    });
  });

  it("calls `editSubjectData` when calling `submit`", () => {
    const { wrapperShallow: wrapper, props } = setup();

    wrapper()
      .instance()
      .submit(testData.subjectData.tabId, testData.formData);

    expect(props.editSubjectData).toHaveBeenCalledWith(
      testData.params_id,
      testData.subjectId,
      testData.subjectData.tabId,
      testData.formData
    );
  });

  it("calls `deleteSubjectData` and `history.push` when calling `delete`", done => {
    const { wrapperShallow: wrapper, props } = setup();

    wrapper()
      .instance()
      .delete();

    expect(props.deleteSubjectData).toHaveBeenCalledWith(testData.params_id);

    setImmediate(() => {
      expect(props.history.push).toHaveBeenCalledWith(
        `/subject/${props.currentSubjectId}`
      );
      done();
    });
  });
});
