import SubjectDataTable from "../SubjectDataTable";

const testData = {
  fields: [
    {
      _id: "0",
      description: "Test Description",
      field_type: "test_field",
      show_in_list: true
    }
  ],
  subjectDataArray: [
    {
      _id: "1",
      tabId: "2",
      data: {
        "0": {
          _id: "3",
          fieldId: "0",
          value: "Test value"
        }
      }
    }
  ]
};

const setup = (propOverrides = {}) => {
  const props = {
    loading: false,
    fields: testData.fields,
    subjectDataArray: testData.subjectDataArray,
    onTableRowClick: jest.fn(),
    ...propOverrides
  };

  return {
    props,
    // Lembrar de sempre chamar `unmount` quando usar esse wrapper \/
    wrapperMount: wrapperMount(SubjectDataTable, props)
  };
};

describe("SubjectDataTable", () => {
  it("renders correctly when `loading` is true", () => {
    const { wrapperMount: wrapper } = setup({
      loading: true
    });
    expect(wrapper()).toMatchSnapshot();

    wrapper().unmount();
  });

  describe("when `loading` is false", () => {
    it("renders correctly when `subjectDataArray` is empty", () => {
      const { wrapperMount: wrapper } = setup({
        subjectDataArray: []
      });
      expect(wrapper()).toMatchSnapshot();

      wrapper().unmount();
    });

    it("renders correctly when `subjectDataArray` is not empty", () => {
      const { wrapperMount: wrapper } = setup();
      expect(wrapper()).toMatchSnapshot();

      wrapper().unmount();
    });

    it("calls `onTableRowClick` when clicking on a `TableBody > TableRow`", () => {
      const { wrapperMount: wrapper, props } = setup();
      expect(wrapper()).toMatchSnapshot();

      wrapper()
        .find("TableBody")
        .find("TableRow")
        .first()
        .simulate("click");

      expect(props.onTableRowClick).toHaveBeenCalled();

      wrapper().unmount();
    });
  });
});
