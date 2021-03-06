import React from "react";
import { shallow } from "enzyme";

import FieldsAccordionForm from "../FieldsAccordionForm";

const defaultProps = {
  id: "fields-accordion-test",
  fields: [],
  addField: () => {},
  removeField: () => {}
};

describe("FieldsAccordionForm", () => {
  it("renders correctly", () => {
    const wrapper = shallow(<FieldsAccordionForm {...defaultProps} />);
    expect(wrapper).toMatchSnapshot();
  });
});
