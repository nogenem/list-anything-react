import React from "react";
import { shallow } from "enzyme";

import SearchInput from "../SearchInput";

const defaultProps = {
  id: "seach-form-1",
  onSearch: () => {}
};

describe("SearchInput", () => {
  it("renders correctly", () => {
    const wrapper = shallow(<SearchInput {...defaultProps} />);
    expect(wrapper).toMatchSnapshot();
  });
});
