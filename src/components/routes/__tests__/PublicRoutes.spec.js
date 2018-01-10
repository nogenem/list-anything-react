import PublicRoutes from "../PublicRoutes";

const setup = (propOverrides = {}, pathname = "/login") => {
  const props = {
    history: {
      push: jest.fn(),
      location: { pathname }
    },
    location: { pathname },
    showContent: false,
    ...propOverrides
  };

  return {
    props,
    wrapperShallow: wrapperShallow(PublicRoutes, props, true)
  };
};

describe("PublicRoutes", () => {
  it("renders correctly when `showContent` is false", () => {
    const { wrapperShallow: wrapper } = setup({ showContent: false });
    expect(wrapper()).toMatchSnapshot();
  });

  it("renders correctly when `showContent` is true", () => {
    const { wrapperShallow: wrapper } = setup({ showContent: true });
    expect(wrapper()).toMatchSnapshot();
  });
});
