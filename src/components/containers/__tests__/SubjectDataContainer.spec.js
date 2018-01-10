import configureStore from "redux-mock-store";

import ConnectedSubjectDataContainer, {
  UnconnectedSubjectDataContainer
} from "../SubjectDataContainer";

const setup = (propOverrides = {}) => {
  const props = {
    menuVisible: false,
    onMenuClick: jest.fn(),
    children: "Testando...",
    activeTab: "",
    tabs: [],
    ...propOverrides
  };

  return {
    props,
    connectedWrapperShallow: wrapperShallow(
      ConnectedSubjectDataContainer,
      props,
      true
    ),
    wrapperShallow: wrapperShallow(UnconnectedSubjectDataContainer, props, true)
  };
};

const testData = {};
testData.tabs = [{ _id: "1", description: "Test" }];
testData.activeTab = testData.tabs[0]._id;
testData.tabid = testData.activeTab;

describe("ConnectedSubjectDataContainer", () => {
  const mockStore = configureStore();
  const state = {};
  it("renders correctly", () => {
    const { connectedWrapperShallow: wrapper } = setup({
      store: mockStore(state)
    });
    expect(wrapper()).toMatchSnapshot();
  });
});

describe("UnconnectedSubjectDataContainer", () => {
  it("renders correctly when `tabs` is empty", () => {
    const { wrapperShallow: wrapper } = setup({ tabs: [] });
    expect(wrapper()).toMatchSnapshot();
  });

  it("renders correctly when `tabs` is not empty", () => {
    const { wrapperShallow: wrapper } = setup({
      tabs: testData.tabs
    });
    expect(wrapper()).toMatchSnapshot();
  });

  it("renders correctly when `menuVisible` is false", () => {
    const { wrapperShallow: wrapper } = setup({
      menuVisible: false
    });
    expect(wrapper()).toMatchSnapshot();
  });

  it("renders correctly when `menuVisible` is true", () => {
    const { wrapperShallow: wrapper } = setup({
      menuVisible: true
    });
    expect(wrapper()).toMatchSnapshot();
  });

  it("renders correctly when `activeTab` is set", () => {
    const { wrapperShallow: wrapper } = setup({
      tabs: testData.tabs,
      activeTab: testData.activeTab
    });
    expect(wrapper()).toMatchSnapshot();
  });

  it("calls `onMenuClick` when clicking on a `Sidemenu Item`", () => {
    const { wrapperShallow: wrapper, props } = setup({
      tabs: testData.tabs
    });

    wrapper()
      .find({ tabid: testData.tabid })
      .simulate("click");
    expect(props.onMenuClick).toHaveBeenCalled();
  });
});
