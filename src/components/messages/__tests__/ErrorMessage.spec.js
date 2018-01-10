import ErrorMessage from "../ErrorMessage";

const setup = (propOverrides = {}) => {
  const props = {
    text: "some text",
    showHeader: true,
    ...propOverrides
  };

  return {
    props,
    wrapperShallow: wrapperShallow(ErrorMessage, props)
  };
};

describe("ErrorMessage", () => {
  it("renders correctly when `showHeader` is true", () => {
    const { wrapperShallow: wrapper } = setup({ showHeader: true });
    expect(wrapper()).toMatchSnapshot();
  });

  it("renders correctly when `showHeader` is false", () => {
    const { wrapperShallow: wrapper } = setup({ showHeader: false });
    expect(wrapper()).toMatchSnapshot();
  });
});
