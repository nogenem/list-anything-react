import React from "react";

import PublicRoutes from "../PublicRoutes";

const defaultProps = {
  history: {
    push: () => {},
    location: { pathname: "" }
  },
  location: { pathname: "" },
  showContent: false
};

describe("PublicRoutes", () => {
  const props = { ...defaultProps };

  describe("when `showContent` is false", () => {
    it("renders correctly", () => {
      props.showContent = false;

      const wrapper = shallowWithContext(<PublicRoutes {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe("when `showContent` is true", () => {
    it("renders correctly", () => {
      props.showContent = true;

      const wrapper = shallowWithContext(<PublicRoutes {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
