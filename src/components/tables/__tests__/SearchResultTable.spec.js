import React from "react";
import { shallow } from "enzyme";

import SearchResultTable from "../SearchResultTable";

const defaultProps = {
  results: [],
  onTableRowClick: () => {}
};

describe("SearchResultTable", () => {
  it("renders correctly when `results` is empty", () => {
    defaultProps.results = [];

    const wrapper = shallow(<SearchResultTable {...defaultProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("renders correctly when `results` is not empty", () => {
    const result = {
      _id: "0",
      value: "Test Value",
      subject: "Test Subject",
      tab: "Test Tab",
      field: {
        _id: "0",
        description: "Test Description",
        field_type: "test_field"
      }
    };
    defaultProps.results = [result];

    const wrapper = shallow(<SearchResultTable {...defaultProps} />);
    expect(wrapper).toMatchSnapshot();
  });
});
