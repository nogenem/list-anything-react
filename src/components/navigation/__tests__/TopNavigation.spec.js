import React from "react";
import configureStore from "redux-mock-store";

import ConnectedTopNavigation, {
  UnconnectedTopNavigation
} from "../TopNavigation";

const defaultProps = {
  toggleMenu: () => {},
  hideMenu: () => {},
  search: () => {},
  activeItem: ""
};

describe("ConnectedTopNavigation", () => {
  const mockStore = configureStore();
  const initialState = {
    user: {
      email: "main@mail.com"
    }
  };
  const props = { ...defaultProps, store: mockStore(initialState) };

  it("renders correctly", () => {
    const wrapper = shallowWithContext(<ConnectedTopNavigation {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe("UnconnectedTopNavigation", () => {
  const props = {
    ...defaultProps,
    email: "main@mail.com",
    hasSubjects: false,
    logout: jest.fn()
  };

  it("renders correctly when `hasSubjects` is false", () => {
    props.hasSubjects = false;

    const wrapper = shallowWithContext(<UnconnectedTopNavigation {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("renders correctly when `hasSubjects` is true", () => {
    props.hasSubjects = true;

    const wrapper = shallowWithContext(<UnconnectedTopNavigation {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("renders correctly when `activeItem` is set", () => {
    props.activeItem = "/dashboard";

    const wrapper = shallowWithContext(<UnconnectedTopNavigation {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
