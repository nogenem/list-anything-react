import { schema } from "normalizr";

export const subjectsSchema = new schema.Entity(
  "subjects",
  {},
  { idAttribute: "_id" }
);

const tabsSchema = new schema.Entity("tabs", {}, { idAttribute: "_id" });
const fieldsSchema = new schema.Entity("fields", {}, { idAttribute: "_id" });

export const subjectSchema = new schema.Entity(
  "subject",
  { tabs: [tabsSchema], fields: [fieldsSchema] },
  { idAttribute: "_id" }
);

export const subjectDataSchema = new schema.Entity(
  "subjectData",
  {},
  { idAttribute: "_id" }
);
