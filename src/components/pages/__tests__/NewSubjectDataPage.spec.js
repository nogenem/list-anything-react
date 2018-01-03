import React from "react";
import configureStore from "redux-mock-store";

import ConnectedNewSubjectDataPage, {
  UnconnectedNewSubjectDataPage
} from "../NewSubjectDataPage";

const defaultProps = {
  history: {
    push: () => {}
  },
  match: {
    params: {
      _id: "1"
    }
  }
};

describe("ConnectedNewSubjectDataPage", () => {
  const mockStore = configureStore();
  const initialState = {};
  const props = { ...defaultProps, store: mockStore(initialState) };

  it("renders correctly", () => {
    const wrapper = shallowWithContext(
      <ConnectedNewSubjectDataPage {...props} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});

describe("UnconnectedNewSubjectDataPage", () => {
  const props = {
    ...defaultProps,
    subjectId: "",
    createSubjectData: () => Promise.resolve(),
    fetchSubjectById: () => Promise.resolve()
  };

  it("renders correctly", () => {
    const wrapper = shallowWithContext(
      <UnconnectedNewSubjectDataPage {...props} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
