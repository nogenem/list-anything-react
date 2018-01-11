import ListValues from "../ListValues";

const testData = {
  values_str: ["testando1"],
  values_url: ["http://google.com"]
};

const setup = (propOverrides = {}) => {
  const props = {
    values: testData.values_str,
    onRemove: jest.fn(),
    renderValue: undefined,
    style: {},
    ...propOverrides
  };

  return {
    props,
    wrapperShallow: wrapperShallow(ListValues, props)
  };
};

describe("ListValues", () => {
  describe("when `renderValue` is not passed", () => {
    it("renders correctly both strings and urls", () => {
      const { wrapperShallow: wrapper } = setup({
        values: [...testData.values_str, ...testData.values_url]
      });
      expect(wrapper()).toMatchSnapshot();
    });
  });

  it("calls `renderValue` when it is passed", () => {
    const { wrapperShallow: wrapper, props } = setup({
      renderValue: jest.fn()
    });
    wrapper(); // shallow render the component
    expect(props.renderValue).toHaveBeenCalled();
  });

  describe("when `onRemove` is passed", () => {
    it("renders correctly", () => {
      const { wrapperShallow: wrapper } = setup();
      expect(wrapper()).toMatchSnapshot();
    });

    it("calls `onRemove` when clicking on a `Remove Icon`", () => {
      const { wrapperShallow: wrapper, props } = setup();
      wrapper()
        .find('ListIcon[name="remove"]')
        .first()
        .simulate("click");
      expect(props.onRemove).toHaveBeenCalled();
      expect(props.onRemove).toHaveBeenCalledWith(0); // index
    });
  });

  it("renders correctly when `onRemove` is not passed", () => {
    const { wrapperShallow: wrapper } = setup({
      onRemove: null
    });
    expect(wrapper()).toMatchSnapshot();
  });
});
