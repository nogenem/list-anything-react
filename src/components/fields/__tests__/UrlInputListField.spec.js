import React from "react";
import { shallow } from "enzyme";

import UrlInputListField from "../UrlInputListField";

const defaultProps = {
  value: "testando...",
  error: "",
  editable: true,
  showFieldDescription: false,
  field: { _id: "1", description: "Testando:" },
  onChange: () => {}
};

describe("UrlInputListField", () => {
  describe("when `editable` is true", () => {
    const props = { ...defaultProps, editable: true };

    it("renders correctly", () => {
      const wrapper = shallow(<UrlInputListField {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe("when `editable` is false", () => {
    let props;

    beforeEach(() => {
      props = { ...defaultProps, editable: false };
    });

    it("renders correctly when `showFieldDescription` is false", () => {
      props.showFieldDescription = false;

      const wrapper = shallow(<UrlInputListField {...props} />);
      expect(wrapper).toMatchSnapshot();
    });

    it("renders correctly when `showFieldDescription` is true", () => {
      props.showFieldDescription = true;

      const wrapper = shallow(<UrlInputListField {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
