import handleServerErrors from "../handleServerErrors";

describe("handleServerErrors", () => {
  it("handles error with `status` === 500", () => {
    const err = {
      response: {
        status: 500
      }
    };
    expect(handleServerErrors(err)).toEqual({
      global: "Internal server error"
    });
  });

  it("handles errors with `status` !== 500", () => {
    const err = {
      response: {
        status: 400,
        data: {
          errors: {
            global: "Invalid id"
          }
        }
      }
    };
    expect(handleServerErrors(err)).toEqual({
      global: "Invalid id"
    });
  });

  it("returns default error message when no `errors` object is found", () => {
    const err = {
      response: {
        status: 400,
        data: {}
      }
    };
    expect(handleServerErrors(err)).toEqual({
      global: "Internal server error"
    });
  });
});
