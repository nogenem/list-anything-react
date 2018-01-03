import React from "react";
import { shallow } from "enzyme";

import SignupForm from "../SignupForm";

const defaultProps = {
  submit: () => {}
};

describe("SignupForm", () => {
  it("renders correctly", () => {
    const wrapper = shallow(<SignupForm {...defaultProps} />);
    expect(wrapper).toMatchSnapshot();
  });
});
