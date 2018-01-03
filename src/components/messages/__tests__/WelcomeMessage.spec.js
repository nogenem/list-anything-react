import React from "react";
import { shallow } from "enzyme";

import WelcomeMessage from "../WelcomeMessage";

describe("WelcomeMessage", () => {
  it("renders correctly", () => {
    const wrapper = shallow(<WelcomeMessage />);
    expect(wrapper).toMatchSnapshot();
  });
});
