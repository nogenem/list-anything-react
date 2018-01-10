import React from "react";

import PrivateRoutes from "../PrivateRoutes";

const defaultProps = {
  history: {
    push: () => {},
    location: { pathname: "/dashboard" }
  },
  location: { pathname: "/dashboard" },
  showContent: false
};

describe("PrivateRoutes", () => {
  it("renders correctly", () => {
    const wrapper = shallowWithContext(<PrivateRoutes {...defaultProps} />);
    expect(wrapper).toMatchSnapshot();
  });
});
