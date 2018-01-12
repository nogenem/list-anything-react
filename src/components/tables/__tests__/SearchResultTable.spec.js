import SearchResultTable from "../SearchResultTable";

const testData = {
  results: [
    {
      _id: "0",
      value: "Test Value",
      subject: "Test Subject",
      tab: "Test Tab",
      field: {
        _id: "0",
        description: "Test Description",
        field_type: "test_field"
      }
    }
  ]
};

const setup = (propOverrides = {}) => {
  const props = {
    results: testData.results,
    onTableRowClick: jest.fn(),
    ...propOverrides
  };

  return {
    props,
    // Lembrar de sempre chamar `unmount` quando usar esse wrapper \/
    wrapperMount: wrapperMount(SearchResultTable, props)
  };
};

describe("SearchResultTable", () => {
  it("renders correctly when `results` is empty", () => {
    const { wrapperMount: wrapper } = setup({
      results: []
    });
    expect(wrapper()).toMatchSnapshot();

    wrapper().unmount();
  });

  it("renders correctly when `results` is not empty", () => {
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
