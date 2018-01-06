import { subjectsSchema, subjectSchema, subjectDataSchema } from "../schemas";

describe("schemas", () => {
  it("subjectsSchema renders correctly", () => {
    expect(subjectsSchema).toMatchSnapshot();
  });

  it("subjectSchema renders correctly", () => {
    expect(subjectSchema).toMatchSnapshot();
  });

  it("subjectDataSchema renders correctly", () => {
    expect(subjectDataSchema).toMatchSnapshot();
  });
});
