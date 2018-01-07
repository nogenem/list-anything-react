import React from "react";
import { shallow } from "enzyme";

import SimpleForm from "../SimpleForm";

const defaultProps = {
  id: "test-form",
  validate: () => ({}),
  render: () => <div />,
  getData: () => ({}),
  submit: () => {}
};

describe("SimpleForm", () => {
  it("renders correctly", () => {
    const wrapper = shallow(<SimpleForm {...defaultProps} />);
    expect(wrapper).toMatchSnapshot();
  });
});
