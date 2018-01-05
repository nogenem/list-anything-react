import { SEARCH_RESULTS } from "../../constants/actionTypes";
import searchRequest from "../search";

jest.mock("../../api", () => ({
  __esModule: true,
  default: {
    subjectData: {
      search: query => {
        expect(query).toBe("test"); // testQuery
        return Promise.resolve([]);
      }
    }
  }
}));

const testQuery = "test";

describe("search actions", () => {
  it("searchRequest", async () => {
    expect.assertions(3);
    const dispatch = action => {
      expect(action.type).toBe(SEARCH_RESULTS);
      expect(action.data).toBeInstanceOf(Array);
    };

    await searchRequest(testQuery)(dispatch);
  });
});
