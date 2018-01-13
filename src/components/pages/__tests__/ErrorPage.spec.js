import React from "react";
import { shallow } from "enzyme";

import ErrorPage from "../ErrorPage";

describe("ErrorPage", () => {
  it("renders correctly when `error` is passed", () => {
    const wrapper = shallow(<ErrorPage error="some error" />);
    expect(wrapper).toMatchSnapshot();
  });

  it("renders correctly when `error` is not passed", () => {
    const wrapper = shallow(<ErrorPage />);
    expect(wrapper).toMatchSnapshot();
  });
});
