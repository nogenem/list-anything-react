import {
  SUBJECT_DATA_FETCHED,
  SUBJECT_DATA_CREATED,
  SUBJECT_DATA_EDITED,
  SUBJECT_DATA_DELETED
} from "../../constants/actionTypes";
import {
  fetchSDByTabId,
  fetchSDById,
  createSubjectData,
  editSubjectData,
  deleteSubjectData
} from "../subjectData";

jest.mock("../../api", () => ({
  __esModule: true,
  default: {
    subjectData: {
      fetchByTabId: tabId => {
        expect(tabId).toBe("1"); // testTabId
        return Promise.resolve([]);
      },
      fetchById: _id => {
        expect(_id).toBe("2"); // testSubjectId
        return Promise.resolve([]);
      },
      create: data => {
        expect(data).toEqual({
          tabId: "1", // testTabId
          subjectId: "2", // testSubjectId
          data: []
        });
        return Promise.resolve({
          _id: "3" // testSDId
        });
      },
      edit: data => {
        expect(data).toEqual({
          _id: "3", // testSDId
          tabId: "1", // testTabId
          subjectId: "2", // testSubjectId
          data: {}
        });
        return Promise.resolve([
          {
            _id: "3" // testSDId
          }
        ]);
      },
      delete: sdId => {
        expect(sdId).toBe("3"); // testSDId
        return Promise.resolve({
          _id: sdId
        });
      }
    }
  }
}));

const testTabId = "1";
const testSubjectId = "2";
const testSDId = "3";
const testSubjectDataCreate = {
  tabId: testTabId,
  subjectId: testSubjectId
};

describe("subjectData actions", () => {
  it("fetchSDByTabId", async () => {
    expect.assertions(3);
    const dispatch = action => {
      expect(action.type).toBe(SUBJECT_DATA_FETCHED);
      expect(action.data).toEqual({
        // dados normalizados
        entities: {},
        result: []
      });
    };

    await fetchSDByTabId(testTabId)(dispatch);
  });

  it("fetchSDById", async () => {
    expect.assertions(3);
    const dispatch = action => {
      expect(action.type).toBe(SUBJECT_DATA_FETCHED);
      expect(action.data).toEqual({
        // dados normalizados
        entities: {},
        result: []
      });
    };

    await fetchSDById(testSubjectId)(dispatch);
  });

  it("createSubjectData", async () => {
    expect.assertions(3);
    const dispatch = action => {
      expect(action.type).toBe(SUBJECT_DATA_CREATED);
      expect(action.data).toEqual({
        // dados normalizados
        entities: {
          subjectData: {
            [testSDId]: {
              _id: testSDId
            }
          }
        },
        result: testSDId
      });
    };

    await createSubjectData(testSubjectDataCreate)(dispatch);
  });

  it("editSubjectData", async () => {
    expect.assertions(3);
    const dispatch = action => {
      expect(action.type).toBe(SUBJECT_DATA_EDITED);
      expect(action.data).toEqual({
        // dados normalizados
        entities: {
          subjectData: {
            [testSDId]: {
              _id: testSDId
            }
          }
        },
        result: [testSDId]
      });
    };

    await editSubjectData(testSDId, testSubjectId, testTabId, {})(dispatch);
  });

  it("deleteSubjectData", async () => {
    expect.assertions(3);
    const dispatch = action => {
      expect(action.type).toBe(SUBJECT_DATA_DELETED);
      expect(action.data).toEqual({
        _id: testSDId
      });
    };

    await deleteSubjectData(testSDId)(dispatch);
  });
});
