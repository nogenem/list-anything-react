import configureStore from "redux-mock-store";

import ConnectedMainContainer, {
  UnconnectedMainContainer
} from "../MainContainer";

const setup = (propOverrides = {}) => {
  const props = {
    menuVisible: false,
    hideMenu: jest.fn(),
    search: jest.fn(),
    children: "Testando...",
    activeItem: "",
    subjects: [],
    ...propOverrides
  };

  return {
    props,
    connectedWrapperShallow: wrapperShallow(
      ConnectedMainContainer,
      props,
      true
    ),
    wrapperShallow: wrapperShallow(UnconnectedMainContainer, props, true)
  };
};

const testData = {};
testData.subjects = [{ _id: "1", description: "Test" }];
testData.activeItem = `/subject/${testData.subjects[0]._id}`;
testData.to = testData.activeItem;

describe("ConnectedMainContainer", () => {
  const mockStore = configureStore();
  const state = {};
  it("renders correctly", () => {
    const { connectedWrapperShallow: wrapper } = setup({
      store: mockStore(state)
    });
    expect(wrapper()).toMatchSnapshot();
  });
});

describe("UnconnectedMainContainer", () => {
  it("renders correctly when `subjects` is empty", () => {
    const { wrapperShallow: wrapper } = setup({ subjects: [] });
    expect(wrapper()).toMatchSnapshot();
  });

  it("renders correctly when `subjects` is not empty", () => {
    const { wrapperShallow: wrapper } = setup({
      subjects: testData.subjects
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

  it("renders correctly when `activeItem` is set", () => {
    const { wrapperShallow: wrapper } = setup({
      subjects: testData.subjects,
      activeItem: testData.activeItem
    });
    expect(wrapper()).toMatchSnapshot();
  });

  it("calls `hideMenu` when clicking on a `Sidemenu Link`", () => {
    const { wrapperShallow: wrapper, props } = setup({
      subjects: testData.subjects
    });

    wrapper()
      .find({ to: testData.to })
      .simulate("click");
    expect(props.hideMenu).toHaveBeenCalled();
  });
});
