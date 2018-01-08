import React from "react";
import { shallow } from "enzyme";

import SimpleAccordionForm from "../SimpleAccordionForm";

const defaultProps = {
  id: "accordion-form-test",
  title: "Test",
  validate: () => ({}),
  render: () => <div>Testando...</div>,
  submit: () => {},
  getData: () => ({}),
  resetFormData: () => {}
};

describe("SimpleAccordionForm", () => {
  it("renders correctly", () => {
    const wrapper = shallow(<SimpleAccordionForm {...defaultProps} />);
    expect(wrapper).toMatchSnapshot();
  });
});
