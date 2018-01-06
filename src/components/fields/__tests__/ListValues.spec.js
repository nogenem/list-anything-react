import React from "react";
import { shallow } from "enzyme";

import ListValues from "../ListValues";

const defaultProps = {
  values: ["testando1", "testando2"]
};

describe("ListValues", () => {
  describe("when `onRemove` is passed", () => {
    const props = { ...defaultProps, onRemove: () => {} };

    it("renders correctly", () => {
      const wrapper = shallow(<ListValues {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe("when `onRemove` is not passed", () => {
    const props = {
      ...defaultProps
    };

    it("renders correctly", () => {
      const wrapper = shallow(<ListValues {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe("when `values` are urls", () => {
    const props = {
      ...defaultProps,
      values: ["http://google.com", "http://youtube.com"]
    };

    it("renders correctly", () => {
      const wrapper = shallow(<ListValues {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
