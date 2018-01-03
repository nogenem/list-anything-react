import React from "react";
import { shallow } from "enzyme";

import NewSubjectForm from "../NewSubjectForm";

const defaultProps = {
  submit: () => {}
};

describe("NewSubjectForm", () => {
  it("renders correctly", () => {
    const wrapper = shallow(<NewSubjectForm {...defaultProps} />);
    expect(wrapper).toMatchSnapshot();
  });
});
