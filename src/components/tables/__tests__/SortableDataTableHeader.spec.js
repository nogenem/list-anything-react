import React from "react";
import { shallow } from "enzyme";

import SortableDataTableHeader from "../SortableDataTableHeader";

const defaultProps = {
  data: [],
  sort: () => {},
  renderHeader: () => <div>Testando...</div>
};

describe("SortableDataTableHeader", () => {
  it("renders correctly", () => {
    defaultProps.results = [];

    const wrapper = shallow(<SortableDataTableHeader {...defaultProps} />);
    expect(wrapper).toMatchSnapshot();
  });
});
