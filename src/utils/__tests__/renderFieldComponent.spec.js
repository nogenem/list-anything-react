import { shallow } from "enzyme";

import renderFieldComponent from "../renderFieldComponent";
import { TEXT_INPUT } from "../../constants/fieldTypes";

describe("renderFieldComponent", () => {
  describe("when passed a valid `field.field_type`", () => {
    const testData = {
      value: "testando...",
      editable: true,
      showFieldDescription: true,
      field: { _id: "1", description: "Testando:", field_type: TEXT_INPUT }
    };

    it("renders the correct field component", () => {
      const wrapper = shallow(renderFieldComponent(testData));
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe("when passed a valid `field.field_type`", () => {
    const testData = {
      field: { _id: "1", description: "Testando:", field_type: "test" }
    };

    it("renders the default div", () => {
      const wrapper = shallow(renderFieldComponent(testData));
      expect(wrapper).toMatchSnapshot();
    });
  });
});
