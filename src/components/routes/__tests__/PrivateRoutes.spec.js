import React from "react";

import PrivateRoutes from "../PrivateRoutes";

const defaultProps = {
  history: {
    push: () => {},
    location: { pathname: "" }
  },
  location: { pathname: "" },
  showContent: false
};

describe("PrivateRoutes", () => {
  it("renders correctly", () => {
    const wrapper = shallowWithContext(<PrivateRoutes {...defaultProps} />);
    expect(wrapper).toMatchSnapshot();
  });
});
