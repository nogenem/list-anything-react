/* eslint-disable import/no-extraneous-dependencies */
// Esse aquivo só é chamado durante testes!

import { configure, shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import createRouterContext from "react-router-test-context";
import PropTypes from "prop-types";

configure({ adapter: new Adapter() });

const createContext = () => {
  const location = {
    pathname: "/",
    search: "",
    hash: "",
    key: "111111"
  };
  return createRouterContext({ location });
};

const childContextTypes = {
  router: PropTypes.object
};

global.shallowWithContext = comp => shallow(comp, { context: createContext() });
global.mountWithContext = comp =>
  mount(comp, { context: createContext(), childContextTypes });

class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear = () => {
    this.store = {};
  };

  getItem = key => this.store[key] || null;

  setItem = (key, value) => {
    this.store[key] = value;
  };

  removeItem = key => {
    delete this.store[key];
  };
}
global.localStorage = new LocalStorageMock();
