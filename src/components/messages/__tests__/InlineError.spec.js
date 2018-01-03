import React from "react";
import { shallow } from "enzyme";

import InlineError from "../InlineError";

describe("InlineError", () => {
  it("renders correctly", () => {
    const wrapper = shallow(<InlineError text="some text" />);
    expect(wrapper).toMatchSnapshot();
  });
});
