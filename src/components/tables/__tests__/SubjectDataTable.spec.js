import React from "react";
import { shallow } from "enzyme";

import SubjectDataTable from "../SubjectDataTable";

const defaultProps = {
  loading: false,
  fields: [],
  subjectDataArray: [],
  onTableRowClick: () => {}
};

describe("SubjectDataTable", () => {
  it("renders correctly", () => {
    defaultProps.results = [];

    const wrapper = shallow(<SubjectDataTable {...defaultProps} />);
    expect(wrapper).toMatchSnapshot();
  });
});
