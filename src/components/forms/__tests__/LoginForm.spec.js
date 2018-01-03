import React from "react";
import { shallow } from "enzyme";

import LoginForm from "../LoginForm";

const defaultProps = {
  submit: () => {}
};

describe("LoginForm", () => {
  it("renders correctly", () => {
    const wrapper = shallow(<LoginForm {...defaultProps} />);
    expect(wrapper).toMatchSnapshot();
  });
});
