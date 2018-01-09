import React from "react";
import { shallow } from "enzyme";

import DataTableBody from "../DataTableBody";

const defaultProps = {
  renderBody: () => <div>Testando...</div>
};

describe("DataTableBody", () => {
  it("renders correctly", () => {
    defaultProps.results = [];

    const wrapper = shallow(<DataTableBody {...defaultProps} />);
    expect(wrapper).toMatchSnapshot();
  });
});
