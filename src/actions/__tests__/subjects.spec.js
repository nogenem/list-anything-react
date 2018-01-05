import {
  SUBJECTS_FETCHED,
  SUBJECT_CREATED,
  SUBJECT_FETCHED_BY_ID,
  SUBJECT_FETCHED_BY_TABID,
  SUBJECT_DELETED
} from "../../constants/actionTypes";
import {
  fetchAllSubjects,
  fetchSubjectById,
  fetchSubjectByTabId,
  createSubject,
  deleteSubject
} from "../subjects";

jest.mock("../../api", () => ({
  __esModule: true,
  default: {
    subjects: {
      fetchAll: () => Promise.resolve([]),
      fetchById: _id => {
        expect(_id).toBe("1"); // testSubjectId
        return Promise.resolve({
          _id: "1" // testSubjectId
        });
      },
      fetchByTabId: tabId => {
        expect(tabId).toBe("2"); // testSTabId
        return Promise.resolve({
          _id: "1" // testSubjectId
        });
      },
      create: data => {
        expect(data.description).toBe("test"); // testSubject.description
        return Promise.resolve({
          _id: "3" // testSubjectIdCreated
        });
      },
      delete: _id => {
        expect(_id).toBe("1"); // testSubjectId
        return Promise.resolve({
          _id: "1" // testSubjectId
        });
      }
    }
  }
}));

const testSubjectId = "1";
const testTabId = "2";
const testSubjectIdCreated = "3";
const testSubject = {
  description: "test",
  tabs: [],
  fields: []
};

describe("subjects actions", () => {
  it("fetchAllSubjects", async () => {
    expect.assertions(2);
    const dispatch = action => {
      expect(action.type).toBe(SUBJECTS_FETCHED);
      expect(action.data).toEqual({
        // dados normalizados
        entities: {},
        result: []
      });
    };

    await fetchAllSubjects()(dispatch);
  });

  it("fetchSubjectById", async () => {
    expect.assertions(3);
    const dispatch = action => {
      expect(action.type).toBe(SUBJECT_FETCHED_BY_ID);
      expect(action.data).toEqual({
        // dados normalizados
        entities: { subject: { [testSubjectId]: { _id: testSubjectId } } },
        result: testSubjectId
      });
    };

    await fetchSubjectById(testSubjectId)(dispatch);
  });

  it("fetchSubjectByTabId", async () => {
    expect.assertions(3);
    const dispatch = action => {
      expect(action.type).toBe(SUBJECT_FETCHED_BY_TABID);
      expect(action.data).toEqual({
        // dados normalizados
        entities: { subject: { [testSubjectId]: { _id: testSubjectId } } },
        result: testSubjectId
      });
    };

    await fetchSubjectByTabId(testTabId)(dispatch);
  });

  it("createSubject", async () => {
    expect.assertions(3);
    const dispatch = action => {
      expect(action.type).toBe(SUBJECT_CREATED);
      expect(action.data).toEqual({
        // dados normalizados
        entities: {
          subjects: { [testSubjectIdCreated]: { _id: testSubjectIdCreated } }
        },
        result: testSubjectIdCreated
      });
    };

    await createSubject(testSubject)(dispatch);
  });

  it("deleteSubject", async () => {
    expect.assertions(3);
    const dispatch = action => {
      expect(action.type).toBe(SUBJECT_DELETED);
      expect(action.data).toEqual({
        _id: testSubjectId
      });
    };

    await deleteSubject(testSubjectId)(dispatch);
  });
});
