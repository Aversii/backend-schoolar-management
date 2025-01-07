import Cpf from "../../../domain/valueObjects/cpf";
import { CustomError } from "../../../error/customError";

describe("tests for 'cpf' value object", () => {
  it("should create a valid cpf using 'create' method", () => {
    const validCpf = Cpf.create("111.444.777-35");
    expect(validCpf.cpfNumber).toHaveLength(14);
  });

  it("should create a valid cpf using 'with' method", () => {
    const validCpf = Cpf.create("111.444.777-35");
    const cpfRetrieved = Cpf.with(validCpf);

    expect(cpfRetrieved).toBeInstanceOf(Cpf);
    expect(cpfRetrieved.cpfNumber).toBe("111.444.777-35");
  });

  it("should throw an error for invalid CPF format", () => { 
    expect(() => Cpf.create("123.456.789-00")).toThrow(CustomError);
    expect(() => Cpf.create("aaaaaaaaaaaaaa")).toThrow(CustomError);
    expect(() => Cpf.create("111.111.111-11")).toThrow(CustomError);
    expect(() => Cpf.create("000.000.000-00")).toThrow(CustomError);
  });

  it("should format a CPF correctly", () => {
    const cpfWithoutFormat = Cpf.create("11144477735");
    expect(cpfWithoutFormat.cpfNumber).toBe("111.444.777-35");
  });

  it("should accept already formatted CPF", () => {
    const formattedCpf = Cpf.create("111.444.777-35");
    expect(formattedCpf.cpfNumber).toBe("111.444.777-35");
  });
});
