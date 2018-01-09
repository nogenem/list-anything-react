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
        expect(tabId).toBe("1"); // ids.tabId
        return Promise.resolve([]);
      },
      fetchById: _id => {
        expect(_id).toBe("2"); // ids.subjectId
        return Promise.resolve([]);
      },
      create: data => {
        expect(data).toEqual({
          tabId: "1", // ids.tabId
          subjectId: "2", // ids.subjectId
          data: [{ fieldId: "4", value: "test" }]
        });
        return Promise.resolve({
          _id: "3" // ids.subjectDataId
        });
      },
      edit: data => {
        expect(data).toEqual({
          _id: "3", // ids.subjectDataId
          tabId: "1", // ids.tabId
          subjectId: "2", // ids.subjectId
          data: {}
        });
        return Promise.resolve([
          {
            _id: "3" // ids.subjectDataId
          }
        ]);
      },
      delete: sdId => {
        expect(sdId).toBe("3"); // ids.subjectDataId
        return Promise.resolve({
          _id: sdId
        });
      }
    }
  }
}));

const ids = {
  tabId: "1",
  subjectId: "2",
  subjectDataId: "3",
  fieldId: "4"
};
const testSubjectDataCreate = {
  tabId: ids.tabId,
  subjectId: ids.subjectId,
  [ids.fieldId]: "test"
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

    await fetchSDByTabId(ids.tabId)(dispatch);
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

    await fetchSDById(ids.subjectId)(dispatch);
  });

  it("createSubjectData", async () => {
    expect.assertions(3);
    const dispatch = action => {
      expect(action.type).toBe(SUBJECT_DATA_CREATED);
      expect(action.data).toEqual({
        // dados normalizados
        entities: {
          subjectData: {
            [ids.subjectDataId]: {
              _id: ids.subjectDataId
            }
          }
        },
        result: ids.subjectDataId
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
            [ids.subjectDataId]: {
              _id: ids.subjectDataId
            }
          }
        },
        result: [ids.subjectDataId]
      });
    };

    await editSubjectData(ids.subjectDataId, ids.subjectId, ids.tabId, {})(
      dispatch
    );
  });

  it("deleteSubjectData", async () => {
    expect.assertions(3);
    const dispatch = action => {
      expect(action.type).toBe(SUBJECT_DATA_DELETED);
      expect(action.data).toEqual({
        _id: ids.subjectDataId
      });
    };

    await deleteSubjectData(ids.subjectDataId)(dispatch);
  });
});
