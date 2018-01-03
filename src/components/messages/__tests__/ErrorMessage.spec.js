import React from "react";
import { shallow } from "enzyme";

import ErrorMessage from "../ErrorMessage";

describe("ErrorMessage", () => {
  it("renders correctly when `showHeader` is true", () => {
    const wrapper = shallow(<ErrorMessage text="some text" showHeader />);
    expect(wrapper).toMatchSnapshot();
  });

  it("renders correctly when `showHeader` is false", () => {
    const wrapper = shallow(
      <ErrorMessage text="some text" showHeader={false} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
