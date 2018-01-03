import React from "react";
import configureStore from "redux-mock-store";

import ConnectedNewSubjectPage, {
  UnconnectedNewSubjectPage
} from "../NewSubjectPage";

const defaultProps = {
  history: {
    push: () => {}
  }
};

describe("ConnectedNewSubjectPage", () => {
  const mockStore = configureStore();
  const initialState = {};
  const props = { ...defaultProps, store: mockStore(initialState) };

  it("renders correctly", () => {
    const wrapper = shallowWithContext(<ConnectedNewSubjectPage {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe("UnconnectedNewSubjectPage", () => {
  const props = {
    ...defaultProps,
    createSubject: () => Promise.resolve()
  };

  it("renders correctly", () => {
    const wrapper = shallowWithContext(
      <UnconnectedNewSubjectPage {...props} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
