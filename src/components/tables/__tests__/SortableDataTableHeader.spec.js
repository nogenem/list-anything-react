import SortableDataTableHeader from "../SortableDataTableHeader";

const testData = {
  data: [{ id: "1", content: "Test" }, { id: "2", content: "My Test" }],
  newDataValue: { id: "3", content: "Test 2" }
};

const setup = (propOverrides = {}) => {
  const props = {
    data: testData.data,
    sort: jest.fn(),
    renderHeader: generateCell =>
      testData.data.map(({ id, content }) => generateCell(id, content)),
    ...propOverrides
  };

  return {
    props,
    wrapperShallow: wrapperShallow(SortableDataTableHeader, props)
  };
};

describe("SortableDataTableHeader", () => {
  it("renders correctly", () => {
    const { wrapperShallow: wrapper } = setup();
    expect(wrapper()).toMatchSnapshot();
  });

  it("calls `sort` when clicking on a `TableHeaderCell`", () => {
    const { wrapperShallow: wrapper, props } = setup();

    wrapper()
      .find("TableHeaderCell")
      .first()
      .simulate("click");

    expect(props.sort).toHaveBeenCalled();
  });

  it("resets the `TableHeaderCell`'s prop `sorted` when receiving new prop `data`", () => {
    const { wrapperShallow: wrapper } = setup();

    wrapper()
      .find("TableHeaderCell")
      .first()
      .simulate("click");

    expect(
      wrapper()
        .find("TableHeaderCell")
        .first()
        .props().sorted
    ).not.toBe(null);

    wrapper().setProps({ data: [...testData.data, testData.newDataValue] });

    expect(
      wrapper()
        .find("TableHeaderCell")
        .first()
        .props().sorted
    ).toBe(null);
  });
});
