import configureStore from "redux-mock-store";

import ConnectedDashboardPage, {
  UnconnectedDashboardPage
} from "../DashboardPage";

const setup = (propOverrides = {}) => {
  const props = {
    isConfirmed: true,
    hasSubjects: false,
    ...propOverrides
  };

  return {
    props,
    connectedWrapperShallow: wrapperShallow(ConnectedDashboardPage, props),
    wrapperShallow: wrapperShallow(UnconnectedDashboardPage, props)
  };
};

describe("ConnectedDashboardPage", () => {
  const mockStore = configureStore();
  const state = {};
  it("renders correctly", () => {
    const { connectedWrapperShallow: wrapper } = setup({
      store: mockStore(state)
    });
    expect(wrapper()).toMatchSnapshot();
  });
});

describe("UnconnectedDashboardPage", () => {
  it("renders correctly when `isConfirmed` is false", () => {
    const { wrapperShallow: wrapper } = setup({
      isConfirmed: false
    });
    expect(wrapper()).toMatchSnapshot();
  });

  describe("when `isConfirmed` is true", () => {
    it("renders correctly when `hasSubjects` is false", () => {
      const { wrapperShallow: wrapper } = setup();
      expect(wrapper()).toMatchSnapshot();
    });

    it("renders correctly when `hasSubjects` is true", () => {
      const { wrapperShallow: wrapper } = setup({
        hasSubjects: true
      });
      expect(wrapper()).toMatchSnapshot();
    });
  });
});
