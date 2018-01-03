import configureStore from "redux-mock-store";
import React from "react";

import ConnectedNewSubjectDataForm, {
  UnconnectedNewSubjectDataForm
} from "../NewSubjectDataForm";

const defaultProps = {
  submit: () => {}
};

describe("ConnectedNewSubjectDataForm", () => {
  const mockStore = configureStore();
  const initialState = {};
  const props = { ...defaultProps, store: mockStore(initialState) };

  it("renders correctly", () => {
    const wrapper = shallowWithContext(
      <ConnectedNewSubjectDataForm {...props} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});

describe("UnconnectedNewSubjectDataForm", () => {
  const props = {
    ...defaultProps,
    fields: [],
    tabs: []
  };

  it("renders correctly", () => {
    props.hasSubjects = false;

    const wrapper = shallowWithContext(
      <UnconnectedNewSubjectDataForm {...props} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
