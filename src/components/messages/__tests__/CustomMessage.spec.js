import React from "react";
import { shallow } from "enzyme";

import CustomMessage from "../CustomMessage";

describe("CustomMessage", () => {
  it("renders correctly when no property is passed", () => {
    const wrapper = shallow(<CustomMessage />);
    expect(wrapper).toMatchSnapshot();
  });

  it("renders correctly when all props are passed", () => {
    const wrapper = shallow(
      <CustomMessage
        header={"TEST"}
        content={"Testando..."}
        color={"red"}
        type={"error"}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
