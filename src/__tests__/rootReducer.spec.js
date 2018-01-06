import rootReducer from "../rootReducer";

describe("rootReducer", () => {
  it("renders correctly", () => {
    expect(rootReducer()).toMatchSnapshot();
  });
});
