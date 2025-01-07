const Rg = require("../../../domain/valueObjects/rg").default;
import { CustomError } from "../../../error/customError";

describe("tests for 'rg' value object", () => {
  it("should create a valid rg using 'create' method", () => {
    const validRg = Rg.create("254677435");
    expect(validRg.rgNumber).toHaveLength(12);
  });

  it("should create a valid rg using 'with' method", () => {
    const validRg = Rg.create("254677435");
    const rgRetrieved = Rg.with(validRg);

    expect(rgRetrieved).toBeInstanceOf(Rg);
    expect(rgRetrieved.rgNumber).toBe("25.467.743-5");
  });

  it("should throw an error for invalid RG format", () => { 
    expect(() => Rg.create("12345678X")).toThrow(CustomError);
    expect(() => Rg.create("aaaaaaaaa")).toThrow(CustomError);
    expect(() => Rg.create("471887329")).toThrow(CustomError);
  });

  it("should format a RG correctly", () => {
    const rgWithoutFormat = Rg.create("254677435");
    expect(rgWithoutFormat.rgNumber).toBe("25.467.743-5");
  });

  it("should accept already formatted RG", () => {
    const formattedRg = Rg.create("25.467.743-5");
    expect(formattedRg.rgNumber).toBe("25.467.743-5");
  });
});
