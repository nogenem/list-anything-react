import React from "react";
import configureStore from "redux-mock-store";

import ConnectedMainContainer, {
  UnconnectedMainContainer
} from "../MainContainer";

const defaultProps = {
  menuVisible: false,
  hideMenu: () => {},
  search: () => {},
  children: <span>Testando...</span>,
  activeItem: ""
};

describe("ConnectedMainContainer", () => {
  const mockStore = configureStore();
  const initialState = {};
  const props = { ...defaultProps, store: mockStore(initialState) };

  it("renders correctly", () => {
    const wrapper = shallowWithContext(<ConnectedMainContainer {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe("UnconnectedMainContainer", () => {
  const props = {
    ...defaultProps,
    subjects: []
  };

  it("renders correctly when `subjects` is empty", () => {
    const wrapper = shallowWithContext(<UnconnectedMainContainer {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
