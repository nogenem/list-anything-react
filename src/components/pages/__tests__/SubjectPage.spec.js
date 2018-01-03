import React from "react";
import configureStore from "redux-mock-store";

import ConnectedSubjectPage, { UnconnectedSubjectPage } from "../SubjectPage";

const defaultProps = {
  history: {
    push: () => {}
  },
  match: {
    params: { _id: "1" }
  }
};

describe("ConnectedSubjectPage", () => {
  const mockStore = configureStore();
  const initialState = {};
  const props = { ...defaultProps, store: mockStore(initialState) };

  it("renders correctly", () => {
    const wrapper = shallowWithContext(<ConnectedSubjectPage {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe("UnconnectedSubjectPage", () => {
  const props = {
    ...defaultProps,
    fields: [],
    subjectDataArray: [],
    firstTab: {
      _id: "1"
    },
    fetchSubjectById: () => Promise.resolve(),
    fetchSDByTabId: () => Promise.resolve(),
    deleteSubject: () => Promise.resolve()
  };

  it("renders correctly", () => {
    const wrapper = shallowWithContext(<UnconnectedSubjectPage {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
