import React from "react";
import { shallow } from "enzyme";

import ErrorPage from "../ErrorPage";

describe("ErrorPage", () => {
  it("renders correctly", () => {
    const wrapper = shallow(<ErrorPage error="some error" />);
    expect(wrapper).toMatchSnapshot();
  });
});
