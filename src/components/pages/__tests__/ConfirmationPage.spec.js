import React from "react";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

import ConnectedConfirmationPage, {
  UnconnectedConfirmationPage
} from "../ConfirmationPage";

const defaultProps = {
  match: { params: { token: "some token" } }
};

describe("ConnectedConfirmationPage", () => {
  const mockStore = configureStore([thunk]);
  const initialState = {};
  const props = { ...defaultProps, store: mockStore(initialState) };

  it("renders correctly", () => {
    const wrapper = shallowWithContext(
      <ConnectedConfirmationPage {...props} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});

describe("UnconnectedConfirmationPage", () => {
  const props = {
    ...defaultProps
  };

  beforeEach(() => {
    props.confirm = token => {
      expect(token).toBe(defaultProps.match.params.token);
      return Promise.resolve();
    };
  });

  describe("before `props.confirm` finishes", () => {
    it("renders correctly", () => {
      const wrapper = shallowWithContext(
        <UnconnectedConfirmationPage {...props} />
      );
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe("after `props.confirm` finishes successfully", () => {
    it("renders correctly", done => {
      expect.assertions(2);

      const wrapper = shallowWithContext(
        <UnconnectedConfirmationPage {...props} />
      );
      setImmediate(() => {
        wrapper.update();
        expect(wrapper).toMatchSnapshot();
        done();
      });
    });
  });

  describe("after `props.confirm` finishes with failure", () => {
    it("renders correctly", done => {
      expect.assertions(2);

      props.confirm = token => {
        expect(token).toBe(defaultProps.match.params.token);
        return Promise.reject();
      };

      const wrapper = shallowWithContext(
        <UnconnectedConfirmationPage {...props} />
      );
      setImmediate(() => {
        wrapper.update();
        expect(wrapper).toMatchSnapshot();
        done();
      });
    });
  });
});
