import React from "react";
import { shallow } from "enzyme";

import EditDeleteBtnGroup from "../EditDeleteBtnGroup";

const defaultProps = {
  showEdit: true,
  onEdit: () => {},
  showDelete: true,
  onDelete: () => {}
};

describe("EditDeleteBtnGroup", () => {
  it("renders correctly", () => {
    const wrapper = shallow(<EditDeleteBtnGroup {...defaultProps} />);
    expect(wrapper).toMatchSnapshot();
  });
});
