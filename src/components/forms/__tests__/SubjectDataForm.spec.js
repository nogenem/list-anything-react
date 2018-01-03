import React from "react";
import { shallow } from "enzyme";

import SubjectDataForm from "../SubjectDataForm";

const defaultProps = {
  submit: () => {},
  delete: () => {},
  subjectData: {},
  fields: [],
  tabs: []
};

describe("SubjectDataForm", () => {
  it("renders correctly", () => {
    const wrapper = shallow(<SubjectDataForm {...defaultProps} />);
    expect(wrapper).toMatchSnapshot();
  });
});
