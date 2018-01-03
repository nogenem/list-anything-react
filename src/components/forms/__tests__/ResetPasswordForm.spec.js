import React from "react";
import { shallow } from "enzyme";

import ResetPasswordForm from "../ResetPasswordForm";

const defaultProps = {
  submit: () => {},
  token: "some token"
};

describe("ResetPasswordForm", () => {
  it("renders correctly", () => {
    const wrapper = shallow(<ResetPasswordForm {...defaultProps} />);
    expect(wrapper).toMatchSnapshot();
  });
});
