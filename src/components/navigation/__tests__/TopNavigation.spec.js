import configureStore from "redux-mock-store";

import ConnectedTopNavigation, {
  UnconnectedTopNavigation
} from "../TopNavigation";

const setup = (propOverrides = {}) => {
  const props = {
    toggleMenu: jest.fn(),
    hideMenu: jest.fn(),
    search: jest.fn(),
    activeItem: "",
    email: "main@mail.com",
    hasSubjects: false,
    logout: jest.fn(),
    ...propOverrides
  };

  return {
    props,
    connectedWrapperShallow: wrapperShallow(
      ConnectedTopNavigation,
      props,
      true
    ),
    wrapperShallow: wrapperShallow(UnconnectedTopNavigation, props, true)
  };
};

describe("ConnectedTopNavigation", () => {
  const mockStore = configureStore();
  const state = {
    user: {
      email: "main@mail.com"
    }
  };
  it("renders correctly", () => {
    const { connectedWrapperShallow: wrapper } = setup({
      store: mockStore(state)
    });
    expect(wrapper()).toMatchSnapshot();
  });
});

describe("UnconnectedTopNavigation", () => {
  it("renders correctly when `hasSubjects` is false", () => {
    const { wrapperShallow: wrapper } = setup({ hasSubjects: false });
    expect(wrapper()).toMatchSnapshot();
  });

  it("renders correctly when `hasSubjects` is true", () => {
    const { wrapperShallow: wrapper } = setup({ hasSubjects: true });
    expect(wrapper()).toMatchSnapshot();
  });

  it("renders correctly when `activeItem` is set", () => {
    const { wrapperShallow: wrapper } = setup({ activeItem: "/dashboard" });
    expect(wrapper()).toMatchSnapshot();
  });

  it("calls `toggleMenu` when clicking on the `Sidemenu MenuItem`", () => {
    const { wrapperShallow: wrapper, props } = setup();

    wrapper()
      .find("MenuItem")
      .find({ name: "toggle-sidebar" })
      .simulate("click");
    expect(props.toggleMenu).toHaveBeenCalled();
  });

  it("calls `hideMenu` when clicking on a `MenuItem`", () => {
    const { wrapperShallow: wrapper, props } = setup();

    wrapper()
      .find("MenuItem")
      .find({ to: "/dashboard" })
      .simulate("click");
    expect(props.hideMenu).toHaveBeenCalled();
  });

  it("calls `logout` when clicking on the `logout DropdownItem`", () => {
    const { wrapperShallow: wrapper, props } = setup();

    wrapper()
      .find("DropdownItem")
      .find({ name: "logout-btn" })
      .simulate("click");
    expect(props.logout).toHaveBeenCalled();
  });
});
