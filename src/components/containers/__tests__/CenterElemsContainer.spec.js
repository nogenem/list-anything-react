import React from "react";
import { shallow } from "enzyme";

import CenterElemsContainer from "../CenterElemsContainer";

describe("CenterElemsContainer", () => {
  it("renders correctly", () => {
    const wrapper = shallow(
      <CenterElemsContainer>Testando...</CenterElemsContainer>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
