import React from "react";
import configureStore from "redux-mock-store";

import ConnectedSubjectDataContainer, {
  UnconnectedSubjectDataContainer
} from "../SubjectDataContainer";

const defaultProps = {
  menuVisible: false,
  onMenuClick: jest.fn(),
  children: <span>Testando...</span>,
  activeTab: ""
};

describe("ConnectedSubjectDataContainer", () => {
  const mockStore = configureStore();
  const initialState = {};
  const props = { ...defaultProps, store: mockStore(initialState) };

  it("renders correctly", () => {
    const wrapper = shallowWithContext(
      <ConnectedSubjectDataContainer {...props} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});

describe("UnconnectedSubjectDataContainer", () => {
  const props = {
    ...defaultProps,
    tabs: []
  };

  it("renders correctly when `tabs` is empty", () => {
    const wrapper = shallowWithContext(
      <UnconnectedSubjectDataContainer {...props} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
