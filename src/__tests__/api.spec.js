import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import api from "../api";

const tokens = {
  user: "123456789",
  confirmation: "1234567890"
};
const ids = {
  subjectId: "1",
  tabId: "2",
  fieldId: "3",
  subjectDataId: "4",
  SDDataId: "5"
};
const testUser = {
  email: "test@test.com",
  password: "123"
};
const testResetPass = {
  token: tokens.user,
  password: "1234",
  passwordConfirmation: "1234"
};
const testSubjectCreate = {
  description: "test",
  tabs: [{ description: "test tab" }],
  fields: [{ description: "test field" }]
};
const testSubject = {
  _id: ids.subjectId,
  description: "test",
  tabs: [{ _id: ids.tabId, description: "test tab" }],
  fields: [{ _id: ids.fieldId, description: "test field" }]
};
const testSubjectDataCreate = {
  tabId: ids.tabId,
  subjectId: ids.subjectId,
  data: [
    {
      fieldId: ids.fieldId,
      value: "test"
    }
  ]
};
const testSubjectData = {
  _id: ids.subjectDataId,
  tabId: ids.tabId,
  subjectId: ids.subjectId,
  data: [
    {
      _id: ids.SDDataId,
      fieldId: ids.fieldId,
      value: "test"
    }
  ]
};

describe("api", () => {
  const adapter = new MockAdapter(axios);

  beforeEach(() => {
    adapter.reset();
  });

  describe(".user", () => {
    it(".login", async () => {
      expect.assertions(2);

      const expectedData = { email: testUser.email, token: tokens.user };
      adapter.onPost("/api/auth", { credentials: testUser }).reply(() => {
        expect(true).toBe(true);
        return [200, { user: expectedData }];
      });

      const ret = await api.user.login(testUser);
      expect(ret).toEqual(expectedData);
    });

    it(".signup", async () => {
      expect.assertions(2);

      const expectedData = { email: testUser.email, token: tokens.user };
      adapter.onPost("/api/users", { user: testUser }).reply(() => {
        expect(true).toBe(true);
        return [200, { user: expectedData }];
      });

      const ret = await api.user.signup(testUser);
      expect(ret).toEqual(expectedData);
    });

    it(".confirm", async () => {
      expect.assertions(2);

      const expectedData = { email: testUser.email, token: tokens.user };
      adapter
        .onPost("/api/auth/confirmation", { token: tokens.confirmation })
        .reply(() => {
          expect(true).toBe(true);
          return [200, { user: expectedData }];
        });

      const ret = await api.user.confirm(tokens.confirmation);
      expect(ret).toEqual(expectedData);
    });

    it(".resetPasswordRequest", async () => {
      expect.assertions(2);

      const expectedData = {};
      adapter
        .onPost("/api/auth/reset_password_request", { email: testUser.email })
        .reply(() => {
          expect(true).toBe(true);
          return [200, expectedData];
        });

      const ret = await api.user.resetPasswordRequest(testUser.email);
      expect(ret.data).toEqual(expectedData);
    });

    it(".validateToken", async () => {
      expect.assertions(2);

      const expectedData = {};
      adapter
        .onPost("/api/auth/validate_token", { token: tokens.confirmation })
        .reply(() => {
          expect(true).toBe(true);
          return [200, expectedData];
        });

      const ret = await api.user.validateToken(tokens.confirmation);
      expect(ret.data).toEqual(expectedData);
    });

    it(".resetPassword", async () => {
      expect.assertions(2);

      const expectedData = {};
      adapter
        .onPost("/api/auth/reset_password", { data: testResetPass })
        .reply(() => {
          expect(true).toBe(true);
          return [200, expectedData];
        });

      const ret = await api.user.resetPassword(testResetPass);
      expect(ret.data).toEqual(expectedData);
    });
  });

  describe(".subjects", () => {
    it(".create", async () => {
      expect.assertions(2);

      const expectedData = testSubject;
      adapter
        .onPost("/api/subjects", { subject: testSubjectCreate })
        .reply(() => {
          expect(true).toBe(true);
          return [200, { subject: expectedData }];
        });

      const ret = await api.subjects.create(testSubjectCreate);
      expect(ret).toEqual(expectedData);
    });

    it(".fetchAll", async () => {
      expect.assertions(2);

      const expectedData = [testSubject];
      adapter.onGet("/api/subjects").reply(() => {
        expect(true).toBe(true);
        return [200, { subjects: expectedData }];
      });

      const ret = await api.subjects.fetchAll();
      expect(ret).toEqual(expectedData);
    });

    it(".fetchById", async () => {
      expect.assertions(2);

      const expectedData = testSubject;
      adapter.onGet(`/api/subjects?_id=${ids.subjectId}`).reply(() => {
        expect(true).toBe(true);
        return [200, { subject: expectedData }];
      });

      const ret = await api.subjects.fetchById(ids.subjectId);
      expect(ret).toEqual(expectedData);
    });

    it(".fetchByTabId", async () => {
      expect.assertions(2);

      const expectedData = testSubject;
      adapter.onGet(`/api/subjects?tabId=${ids.tabId}`).reply(() => {
        expect(true).toBe(true);
        return [200, { subject: expectedData }];
      });

      const ret = await api.subjects.fetchByTabId(ids.tabId);
      expect(ret).toEqual(expectedData);
    });

    it(".delete", async () => {
      expect.assertions(2);

      const expectedData = { _id: ids.subjectId };
      adapter.onDelete(`/api/subjects?_id=${ids.subjectId}`).reply(() => {
        expect(true).toBe(true);
        return [200, expectedData];
      });

      const ret = await api.subjects.delete(ids.subjectId);
      expect(ret).toEqual(expectedData);
    });
  });

  describe(".subjectData", () => {
    it(".create", async () => {
      expect.assertions(2);

      const expectedData = testSubjectData;
      adapter
        .onPost("/api/subjects/data", { ...testSubjectDataCreate })
        .reply(() => {
          expect(true).toBe(true);
          return [200, { subjectData: expectedData }];
        });

      const ret = await api.subjectData.create(testSubjectDataCreate);
      expect(ret).toEqual(expectedData);
    });

    it(".fetchByTabId", async () => {
      expect.assertions(2);

      const expectedData = testSubjectData;
      adapter.onGet(`/api/subjects/data?tabId=${ids.tabId}`).reply(() => {
        expect(true).toBe(true);
        return [200, { subjectData: expectedData }];
      });

      const ret = await api.subjectData.fetchByTabId(ids.tabId);
      expect(ret).toEqual(expectedData);
    });

    it(".fetchById", async () => {
      expect.assertions(2);

      const expectedData = testSubjectData;
      adapter.onGet(`/api/subjects/data?_id=${ids.subjectDataId}`).reply(() => {
        expect(true).toBe(true);
        return [200, { subjectData: expectedData }];
      });

      const ret = await api.subjectData.fetchById(ids.subjectDataId);
      expect(ret).toEqual(expectedData);
    });

    it(".edit", async () => {
      expect.assertions(2);

      const expectedData = testSubjectData;
      adapter
        .onPut("/api/subjects/data", { ...testSubjectDataCreate })
        .reply(() => {
          expect(true).toBe(true);
          return [200, { subjectData: expectedData }];
        });

      const ret = await api.subjectData.edit(testSubjectDataCreate);
      expect(ret).toEqual(expectedData);
    });

    it(".delete", async () => {
      expect.assertions(2);

      const expectedData = { _id: ids.subjectDataId };
      adapter
        .onDelete(`/api/subjects/data?_id=${ids.subjectDataId}`)
        .reply(() => {
          expect(true).toBe(true);
          return [200, expectedData];
        });

      const ret = await api.subjectData.delete(ids.subjectDataId);
      expect(ret).toEqual(expectedData);
    });

    it(".search", async () => {
      expect.assertions(2);

      const query = "test";
      const expectedData = [];
      adapter.onGet(`/api/subjects/data?query=${query}`).reply(() => {
        expect(true).toBe(true);
        return [200, { subjectData: expectedData }];
      });

      const ret = await api.subjectData.search(query);
      expect(ret).toEqual(expectedData);
    });
  });

  afterAll(() => {
    adapter.restore();
  });
});
