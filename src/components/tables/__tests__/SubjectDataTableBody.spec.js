import React from "react";
import { shallow } from "enzyme";

import SubjectDataTableBody from "../SubjectDataTableBody";

const defaultProps = {
  loading: false,
  data: [],
  fields: [],
  onTableRowClick: () => {},
  renderCell: () => {}
};

describe("SubjectDataTableBody", () => {
  it("renders correctly", () => {
    defaultProps.results = [];

    const wrapper = shallow(<SubjectDataTableBody {...defaultProps} />);
    expect(wrapper).toMatchSnapshot();
  });
});
