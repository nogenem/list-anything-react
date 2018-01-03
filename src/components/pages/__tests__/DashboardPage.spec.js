import React from "react";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

import ConnectedDashboardPage, {
  UnconnectedDashboardPage
} from "../DashboardPage";

describe("ConnectedDashboardPage", () => {
  const mockStore = configureStore([thunk]);
  const initialState = {};
  const props = { store: mockStore(initialState) };

  it("renders correctly", () => {
    const wrapper = shallowWithContext(<ConnectedDashboardPage {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe("UnconnectedDashboardPage", () => {
  const props = {
    isConfirmed: false,
    hasSubjects: false
  };

  describe("when `isConfirmed` is false", () => {
    it("renders correctly", () => {
      props.isConfirmed = false;

      const wrapper = shallowWithContext(
        <UnconnectedDashboardPage {...props} />
      );
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe("when `isConfirmed` is true", () => {
    beforeEach(() => {
      props.isConfirmed = true;
    });

    describe("when `hasSubjects` is false", () => {
      it("renders correctly", () => {
        props.hasSubjects = false;

        const wrapper = shallowWithContext(
          <UnconnectedDashboardPage {...props} />
        );
        expect(wrapper).toMatchSnapshot();
      });
    });

    describe("when `hasSubjects` is true", () => {
      it("renders correctly", () => {
        props.hasSubjects = true;

        const wrapper = shallowWithContext(
          <UnconnectedDashboardPage {...props} />
        );
        expect(wrapper).toMatchSnapshot();
      });
    });
  });
});
