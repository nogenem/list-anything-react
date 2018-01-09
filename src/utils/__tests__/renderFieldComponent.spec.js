import { shallow } from "enzyme";

import renderFieldComponent from "../renderFieldComponent";
import {
  TEXT_INPUT,
  URL_INPUT_IMG,
  NUMBER_INPUT,
  TEXTAREA,
  URL_INPUT,
  DATE_INPUT,
  TEXT_INPUT_LIST,
  URL_INPUT_LIST
} from "../../constants/fieldTypes";

const defaultProps = {
  value: "testando...",
  field: { _id: "1", description: "Testando:", field_type: "" }
};

describe("renderFieldComponent", () => {
  it("renders correctly when `field.field_type` = TEXT_INPUT", () => {
    defaultProps.field.field_type = TEXT_INPUT;

    const wrapper = shallow(renderFieldComponent(defaultProps));
    expect(wrapper).toMatchSnapshot();
  });

  it("renders correctly when `field.field_type` = URL_INPUT_IMG", () => {
    defaultProps.field.field_type = URL_INPUT_IMG;

    const wrapper = shallow(renderFieldComponent(defaultProps));
    expect(wrapper).toMatchSnapshot();
  });

  it("renders correctly when `field.field_type` = NUMBER_INPUT", () => {
    defaultProps.field.field_type = NUMBER_INPUT;

    const wrapper = shallow(renderFieldComponent(defaultProps));
    expect(wrapper).toMatchSnapshot();
  });

  it("renders correctly when `field.field_type` = TEXTAREA", () => {
    defaultProps.field.field_type = TEXTAREA;

    const wrapper = shallow(renderFieldComponent(defaultProps));
    expect(wrapper).toMatchSnapshot();
  });

  it("renders correctly when `field.field_type` = URL_INPUT", () => {
    defaultProps.field.field_type = URL_INPUT;

    const wrapper = shallow(renderFieldComponent(defaultProps));
    expect(wrapper).toMatchSnapshot();
  });

  it("renders correctly when `field.field_type` = DATE_INPUT", () => {
    defaultProps.field.field_type = DATE_INPUT;

    const wrapper = shallow(renderFieldComponent(defaultProps));
    expect(wrapper).toMatchSnapshot();
  });

  it("renders correctly when `field.field_type` = TEXT_INPUT_LIST", () => {
    defaultProps.field.field_type = TEXT_INPUT_LIST;

    const wrapper = shallow(renderFieldComponent(defaultProps));
    expect(wrapper).toMatchSnapshot();
  });

  it("renders correctly when `field.field_type` = URL_INPUT_LIST", () => {
    defaultProps.field.field_type = URL_INPUT_LIST;

    const wrapper = shallow(renderFieldComponent(defaultProps));
    expect(wrapper).toMatchSnapshot();
  });

  it("renders correctly when `field.field_type` is invalid", () => {
    defaultProps.field.field_type = "test";

    const wrapper = shallow(renderFieldComponent(defaultProps));
    expect(wrapper).toMatchSnapshot();
  });
});
