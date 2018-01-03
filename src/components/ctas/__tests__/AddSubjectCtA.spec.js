import React from "react";

import AddSubjectCtA from "../AddSubjectCtA";

describe("AddSubjectCtA", () => {
  it("renders correctly", () => {
    const wrapper = shallowWithContext(<AddSubjectCtA />);
    expect(wrapper).toMatchSnapshot();
  });
});
