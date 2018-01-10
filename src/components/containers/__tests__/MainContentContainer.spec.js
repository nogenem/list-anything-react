import MainContentContainer from "../MainContentContainer";

const setup = (propOverrides = {}) => {
  const props = {
    showContent: true,
    history: {
      push: jest.fn(),
      location: {
        pathname: "/dashboard"
      }
    },
    children: "Testando...",
    ...propOverrides
  };

  return {
    props,
    wrapperShallow: wrapperShallow(MainContentContainer, props)
  };
};

const testData = {};
testData.to = "/test";
testData.query = "test";

describe("MainContentContainer", () => {
  it("renders correctly when `showContent` is false", () => {
    const { wrapperShallow: wrapper } = setup({ showContent: false });
    expect(wrapper()).toMatchSnapshot();
  });

  it("renders correctly when `showContent` is true", () => {
    const { wrapperShallow: wrapper } = setup({ showContent: true });
    expect(wrapper()).toMatchSnapshot();
  });

  it("toggles menu when passed a valid `to`", () => {
    const { wrapperShallow: wrapper } = setup();

    wrapper()
      .instance()
      .toggleMenu(null, { to: testData.to });

    wrapper().update();
    expect(wrapper()).toMatchSnapshot();
  });

  it("toggles menu when passed an empty `to`", () => {
    const { wrapperShallow: wrapper } = setup();

    wrapper()
      .instance()
      .toggleMenu(null, { to: "" });

    wrapper().update();
    expect(wrapper()).toMatchSnapshot();
  });

  it("hides menu when passed a valid `to`", () => {
    const { wrapperShallow: wrapper } = setup();

    wrapper().setState({ menuVisible: true });
    wrapper()
      .instance()
      .hideMenu(null, { to: testData.to });

    wrapper().update();
    expect(wrapper()).toMatchSnapshot();
  });

  it("hides menu when passed an empty `to`", () => {
    const { wrapperShallow: wrapper } = setup();

    wrapper().setState({ menuVisible: true });
    wrapper()
      .instance()
      .hideMenu(null, { to: "" });

    wrapper().update();
    expect(wrapper()).toMatchSnapshot();
  });

  it("redirects to the search page and closes the menu", () => {
    const { wrapperShallow: wrapper, props } = setup();
    const expectedUrl = `/search?query=${testData.query}`;

    wrapper()
      .instance()
      .search(testData.query);
    expect(props.history.push).toHaveBeenCalled();
    expect(props.history.push).toHaveBeenCalledWith(expectedUrl);

    wrapper().update();
    expect(wrapper()).toMatchSnapshot();
  });
});
