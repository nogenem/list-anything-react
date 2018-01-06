import React from "react";
import { shallow } from "enzyme";

import EditableListInput from "../EditableListInput";

const defaultProps = {
  values: ["testando1", "testando2"],
  type: "text",
  error: "",
  field: { _id: "1", description: "Testando:" },
  onChange: () => {}
};

describe("EditableListInput", () => {
  describe('when `type` is "text"', () => {
    const props = { ...defaultProps, type: "text" };

    it("renders correctly", () => {
      const wrapper = shallow(<EditableListInput {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('when `type` is "url"', () => {
    const props = {
      ...defaultProps,
      type: "url",
      values: ["http://google.com", "http://youtube.com"]
    };

    it("renders correctly", () => {
      const wrapper = shallow(<EditableListInput {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
