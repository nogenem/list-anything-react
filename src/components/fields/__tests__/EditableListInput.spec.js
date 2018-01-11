import EditableListInput from "../EditableListInput";

const testData = {
  values: ["testando1"],
  field: { _id: "1", description: "Testando:" },
  newValue: "New value"
};

const setup = (propOverrides = {}) => {
  const props = {
    values: testData.values,
    type: "text",
    error: "",
    field: testData.field,
    onChange: jest.fn(),
    ...propOverrides
  };

  return {
    props,
    wrapperShallow: wrapperShallow(EditableListInput, props),
    // Lembrar de sempre chamar `unmount` e `detach` quando usar esse wrapper \/
    wrapperMount: wrapperMount(EditableListInput, props, false, true)
  };
};

describe("EditableListInput", () => {
  it("renders correctly when `type` is text", () => {
    const { wrapperShallow: wrapper } = setup({
      type: "text"
    });
    expect(wrapper()).toMatchSnapshot();
  });

  it("renders correctly when `type` is url", () => {
    const { wrapperShallow: wrapper } = setup({
      type: "url"
    });
    expect(wrapper()).toMatchSnapshot();
  });

  it("renders correctly when `error` is passed", () => {
    const { wrapperShallow: wrapper } = setup({
      error: "Something went wrong..."
    });
    expect(wrapper()).toMatchSnapshot();
  });

  it("calls `onChange` when adding a new value", () => {
    expect.assertions(2);

    const { wrapperMount: wrapper } = setup({
      onChange: jest.fn(e => {
        expect(e.target.value.includes(testData.newValue)).toBe(true);
        expect(e.target.values.includes(testData.newValue)).toBe(true);
      })
    });

    wrapper()
      .find(`input[name="${testData.field._id}"]`)
      .instance().value =
      testData.newValue;

    wrapper()
      .find('Button[content="Add"]')
      .simulate("click");

    wrapper().detach();
    wrapper().unmount();
  });

  it("calls `onChange` when calling `onRemoveValue`", () => {
    expect.assertions(2);

    const { wrapperMount: wrapper } = setup({
      onChange: jest.fn(e => {
        expect(e.target.value).toBe("");
        expect(e.target.values).toEqual([]);
      })
    });

    wrapper()
      .instance()
      .onRemoveValue(0);

    wrapper().detach();
    wrapper().unmount();
  });
});
