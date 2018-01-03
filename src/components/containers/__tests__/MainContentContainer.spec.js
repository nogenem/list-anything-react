import React from "react";
import { shallow } from "enzyme";
import MainContentContainer from "../MainContentContainer";

const defaultProps = {
  showContent: false,
  history: {
    push: () => {},
    location: {
      pathname: ""
    }
  },
  children: <span>Testando...</span>
};

describe("MainContentContainer", () => {
  it("renders correctly", () => {
    const wrapper = shallow(<MainContentContainer {...defaultProps} />);
    expect(wrapper).toMatchSnapshot();
  });
});
