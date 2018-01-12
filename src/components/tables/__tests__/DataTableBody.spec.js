import React from "react";
import { shallow } from "enzyme";

import DataTableBody from "../DataTableBody";

const props = {
  renderBody: () => <div>Testando...</div>
};

describe("DataTableBody", () => {
  it("renders correctly", () => {
    const wrapper = shallow(<DataTableBody {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
