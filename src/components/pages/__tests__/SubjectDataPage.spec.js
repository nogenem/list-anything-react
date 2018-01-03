import React from "react";
import configureStore from "redux-mock-store";

import ConnectedSubjectDataPage, {
  UnconnectedSubjectDataPage
} from "../SubjectDataPage";

const defaultProps = {
  history: {
    push: () => {}
  },
  match: {
    params: { _id: "1" }
  }
};

describe("ConnectedSubjectDataPage", () => {
  const mockStore = configureStore();
  const initialState = {};
  const props = { ...defaultProps, store: mockStore(initialState) };

  it("renders correctly", () => {
    const wrapper = shallowWithContext(<ConnectedSubjectDataPage {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe("UnconnectedSubjectDataPage", () => {
  const props = {
    ...defaultProps,
    subjectData: {
      _id: "1",
      tabId: "1"
    },
    fields: [],
    tabs: [],
    currentSubjectId: "1",
    fetchSDById: () => Promise.resolve(),
    fetchSubjectByTabId: () => Promise.resolve(),
    editSubjectData: () => Promise.resolve(),
    deleteSubjectData: () => Promise.resolve()
  };

  it("renders correctly", () => {
    const wrapper = shallowWithContext(
      <UnconnectedSubjectDataPage {...props} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
