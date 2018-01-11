import SimpleInputField from "../SimpleInputField";

const testData = {
  value: "testando...",
  field: { _id: "1", description: "Testando:" },
  newValue: "test"
};

const setup = (propOverrides = {}) => {
  const props = {
    value: testData.value,
    type: "text",
    error: "",
    editable: true,
    showFieldDescription: true,
    field: testData.field,
    onChange: jest.fn(),
    ...propOverrides
  };

  return {
    props,
    wrapperShallow: wrapperShallow(SimpleInputField, props)
  };
};

describe("SimpleInputField", () => {
  describe("when `editable` is true", () => {
    it("renders correctly", () => {
      const { wrapperShallow: wrapper } = setup({
        editable: true
      });
      expect(wrapper()).toMatchSnapshot();
    });

    it("renders correctly when `error` is passed", () => {
      const { wrapperShallow: wrapper } = setup({
        editable: true,
        error: "Something went wrong..."
      });
      expect(wrapper()).toMatchSnapshot();
    });

    it("calls `onChange` when changing the input value", () => {
      const { wrapperShallow: wrapper, props } = setup({
        editable: true
      });

      wrapper()
        .find("FormInput")
        .simulate("change", { target: { value: testData.newValue } });
      expect(props.onChange).toHaveBeenCalled();
    });
  });

  describe("when `editable` is false", () => {
    it("renders correctly when `showFieldDescription` is true", () => {
      const { wrapperShallow: wrapper } = setup({
        editable: false,
        showFieldDescription: true
      });
      expect(wrapper()).toMatchSnapshot();
    });

    it("renders correctly when `showFieldDescription` is false", () => {
      const { wrapperShallow: wrapper } = setup({
        editable: false,
        showFieldDescription: false
      });
      expect(wrapper()).toMatchSnapshot();
    });
  });
});
