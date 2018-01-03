import React from "react";
import { shallow } from "enzyme";

import ConfirmEmailMessage from "../ConfirmEmailMessage";

describe("ConfirmEmailMessage", () => {
  it("renders correctly", () => {
    const wrapper = shallow(<ConfirmEmailMessage />);
    expect(wrapper).toMatchSnapshot();
  });
});
