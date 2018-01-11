/* eslint-disable import/no-extraneous-dependencies */
// Esse aquivo só é chamado durante testes!

import React from "react";
import { configure, shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import createRouterContext from "react-router-test-context";
import PropTypes from "prop-types";

configure({ adapter: new Adapter() });

const createContext = () => {
  const location = {
    pathname: "/dashboard",
    search: "",
    hash: "",
    key: "111111"
  };
  return createRouterContext({ location });
};

const childContextTypes = {
  router: PropTypes.object
};

const getContext = () => ({ context: createContext(), childContextTypes });

// TODO: remover essas 2 funções após trocar elas em todos os testes
global.shallowWithContext = comp => shallow(comp, { context: createContext() });
global.mountWithContext = comp =>
  mount(comp, { context: createContext(), childContextTypes });

global.wrapperShallow = (Comp, props, withContext = false) => {
  let wrapper;
  return () => {
    if (!wrapper) {
      if (withContext) wrapper = shallow(<Comp {...props} />, getContext());
      else wrapper = shallow(<Comp {...props} />);
    }
    return wrapper;
  };
};
global.wrapperMount = (
  Comp,
  props,
  withContext = false,
  attachToDiv = false
) => {
  let wrapper;
  return () => {
    if (!wrapper) {
      const options = {};
      if (attachToDiv) {
        document.body.innerHTML = '<div id="root"></div>';
        options.attachTo = document.getElementById("root");
      } else if (document.body.innerHTML) document.body.innerHTML = "";
      if (withContext)
        wrapper = mount(<Comp {...props} />, { ...options, ...getContext() });
      else wrapper = mount(<Comp {...props} />, options);
    }
    return wrapper;
  };
};

class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  getItem = key => this.store[key] || null;

  setItem = (key, value) => {
    this.store[key] = value;
  };

  removeItem = key => {
    delete this.store[key];
  };
}
global.localStorage = new LocalStorageMock();
