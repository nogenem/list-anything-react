import configureStore from "redux-mock-store";

import ConnectedSearchPage, { UnconnectedSearchPage } from "../SearchPage";

const testData = {};
testData.query = "test";
testData.search = `?query=${testData.query}`;
testData.newQuery = "foo";
testData.newSearch = `?query=${testData.newQuery}`;

const setup = (propOverrides = {}) => {
  const props = {
    history: {
      push: jest.fn()
    },
    location: {
      search: testData.search
    },
    results: [],
    searchRequest: jest.fn(() => Promise.resolve()),
    ...propOverrides
  };

  return {
    props,
    connectedWrapperShallow: wrapperShallow(ConnectedSearchPage, props),
    wrapperShallow: wrapperShallow(UnconnectedSearchPage, props)
  };
};

describe("ConnectedSearchPage", () => {
  const mockStore = configureStore();
  const state = {};
  it("renders correctly", () => {
    const { connectedWrapperShallow: wrapper } = setup({
      store: mockStore(state)
    });
    expect(wrapper()).toMatchSnapshot();
  });
});

describe("UnconnectedSearchPage", () => {
  it("renders correctly before `searchRequest` finishes", () => {
    const { wrapperShallow: wrapper, props } = setup();
    expect(wrapper()).toMatchSnapshot();
    expect(props.searchRequest).toHaveBeenCalledWith(testData.query);
  });

  it("renders correctly after `searchRequest` finishes successfully", done => {
    const { wrapperShallow: wrapper, props } = setup();

    wrapper();
    expect(props.searchRequest).toHaveBeenCalledWith(testData.query);

    setImmediate(() => {
      wrapper().update();
      expect(wrapper()).toMatchSnapshot();
      done();
    });
  });

  it("renders correctly after `searchRequest` finishes with failure", done => {
    const { wrapperShallow: wrapper, props } = setup({
      searchRequest: jest.fn(() => Promise.reject())
    });

    wrapper();
    expect(props.searchRequest).toHaveBeenCalledWith(testData.query);

    setImmediate(() => {
      wrapper().update();
      expect(wrapper()).toMatchSnapshot();
      done();
    });
  });

  it("calls `searchRequest` again after `location.search` changes", () => {
    const { wrapperShallow: wrapper, props } = setup({
      searchRequest: jest.fn(() => Promise.reject())
    });

    wrapper().setProps({
      location: { search: testData.newSearch }
    });

    expect(props.searchRequest).toHaveBeenCalledWith(testData.newQuery);
  });
});
