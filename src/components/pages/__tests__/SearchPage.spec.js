import React from "react";
import configureStore from "redux-mock-store";

import ConnectedSearchPage, { UnconnectedSearchPage } from "../SearchPage";

const defaultProps = {
  history: {
    push: () => {}
  },
  location: {
    search: "some search"
  }
};

describe("ConnectedSearchPage", () => {
  const mockStore = configureStore();
  const initialState = {};
  const props = { ...defaultProps, store: mockStore(initialState) };

  it("renders correctly", () => {
    const wrapper = shallowWithContext(<ConnectedSearchPage {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe("UnconnectedSearchPage", () => {
  const props = {
    ...defaultProps,
    results: [],
    searchRequest: () => Promise.resolve()
  };

  it("renders correctly", () => {
    const wrapper = shallowWithContext(<UnconnectedSearchPage {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
