import { CustomError } from "../../../error/customError";
const Password = require("../../../domain/valueObjects/password").default;

describe("tests for password value object", () => {
  it("should create a password value object using create method", () => {
    const password = Password.create("Aversi123!");
    expect(password.password).toBe("Aversi123!");
  });

  it("should create a password value object using with method", () => {
    const passwordData = { password: "Aversi123!" };
    const password = Password.with(passwordData);

    expect(password.password).toBe("Aversi123!");
  });

  it("should throw a custom error for a password that is too short", () => {
    const shortPassword = "A1!";
    expect(() => Password.create(shortPassword)).toThrow(CustomError);
  });

  it("should throw a custom error for a password that is too long", () => {
    const longPassword = "A".repeat(101) + "1!";
    expect(() => Password.create(longPassword)).toThrow(CustomError);
  });

  it("should throw a custom error if password does not contain uppercase letters", () => {
    const noUppercasePassword = "no-uppercase1!";
    expect(() => Password.create(noUppercasePassword)).toThrow(CustomError);
  });

  it("should throw a custom error if password does not contain lowercase letters", () => {
    const noLowercasePassword = "NOLOWERCASE1!";
    expect(() => Password.create(noLowercasePassword)).toThrow(CustomError);
  });

  it("should throw a custom error if password does not contain numbers", () => {
    const noNumberPassword = "NoNumbers!";
    expect(() => Password.create(noNumberPassword)).toThrow(CustomError);
  });

  it("should throw a custom error if password does not contain special characters", () => {
    const noSpecialCharPassword = "NoSpecialChar1";
    expect(() => Password.create(noSpecialCharPassword)).toThrow(CustomError);
  });

  it("should throw a custom error for passwords not meeting multiple criteria", () => {
    const invalidPasswords = ["AaACa123", "aacc!", "ACaCaCa","!1"];

    invalidPasswords.forEach((password) => {
      expect(() => Password.create(password)).toThrow(CustomError);
    });
  });
});
