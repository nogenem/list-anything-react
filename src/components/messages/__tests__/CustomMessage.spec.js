import CustomMessage from "../CustomMessage";

const setup = (propOverrides = {}) => {
  const props = {
    ...propOverrides
  };

  return {
    props,
    wrapperShallow: wrapperShallow(CustomMessage, props)
  };
};

const testData = {
  header: "Test",
  content: "Testando...",
  color: "red",
  type: "error"
};

describe("CustomMessage", () => {
  it("renders correctly when no prop is passed", () => {
    const { wrapperShallow: wrapper } = setup();
    expect(wrapper()).toMatchSnapshot();
  });

  it("renders correctly when all props are passed", () => {
    const { wrapperShallow: wrapper } = setup(testData);
    expect(wrapper()).toMatchSnapshot();
  });
});
