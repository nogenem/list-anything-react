import React from "react";
import { shallow } from "enzyme";

import ActionBtnsContainer from "../ActionBtnsContainer";

const defaultProps = {
  onMenu: () => {},
  onAdd: () => {},
  onEdit: () => {},
  onDelete: () => {}
};

describe("ActionBtnsContainer", () => {
  it("renders correctly", () => {
    const wrapper = shallow(<ActionBtnsContainer {...defaultProps} />);
    expect(wrapper).toMatchSnapshot();
  });
});
