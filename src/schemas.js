import { schema } from "normalizr";

export const subjectSchema = new schema.Entity(
  "subjects",
  {},
  { idAttribute: "_id" }
);
