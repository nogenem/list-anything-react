import React from "react";
import { shallow } from "enzyme";

import ForgotPasswordForm from "../ForgotPasswordForm";

const defaultProps = {
  submit: () => {}
};

describe("ForgotPasswordForm", () => {
  it("renders correctly", () => {
    const wrapper = shallow(<ForgotPasswordForm {...defaultProps} />);
    expect(wrapper).toMatchSnapshot();
  });
});
