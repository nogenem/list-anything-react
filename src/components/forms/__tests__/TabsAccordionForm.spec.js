import React from "react";
import { shallow } from "enzyme";

import TabsAccordionForm from "../TabsAccordionForm";

const defaultProps = {
  tabs: [],
  addTab: () => {},
  removeTab: () => {}
};

describe("TabsAccordionForm", () => {
  it("renders correctly", () => {
    const wrapper = shallow(<TabsAccordionForm {...defaultProps} />);
    expect(wrapper).toMatchSnapshot();
  });
});
