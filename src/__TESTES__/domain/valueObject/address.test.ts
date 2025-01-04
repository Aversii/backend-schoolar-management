const Validator = require("../../../domain/validations/validator").default;
const Address = require("../../../domain/valueObjects/address").default;

describe("Tests for Address Value Object", () => {
  it("should create a new valid instance of address using create method", () => {
    const address = Address.create(
      "Rua A",
      123,
      "Itapecerica",
      "SP",
      "12345-678"
    );
    const address2 = Address.create(
      "Rua B",
      123,
      "Juquitiba",
      "SP",
      "27845-050"
    );

    expect(address).toBeInstanceOf(Address);
    expect(address.id).toHaveLength(36);
    expect(address.number).toBeGreaterThan(0);
    expect(address.state).toHaveLength(2);
  });

  it("should create a new valid instance of address using with method", () => {
    const address = {
      id: "f3d2393e-d082-4f3a-b2ba-f2bbd325974f",
      addressLine: "Rua A",
      number: 123,
      city: "Cidade",
      state: "SP",
      zipCode: "12345-678",
    };

    const addressWith = Address.with(address);

    expect(addressWith).toBeInstanceOf(Address);
    expect(addressWith.id).toHaveLength(36);
    expect(addressWith.state).toHaveLength(2);
  });

  it("should validate and compare building methods with missing params for 'number' and 'zipcode'", () => {
    const mockData = {
      id: "f3d2393e-d082-4f3a-b2ba-f2bbd325974f",
      addressLine: "Rua A",
      number: 17,
      city: "Itapecerica",
      state: "SP",
      zipCode: "06867-352",
    };

    const address = Address.with(mockData);
    const address2 = Address.create("Rua A", null, "Itapecerica", "SP", null);

    expect(address.number).toBeGreaterThan(0);
    expect(address.id).not.toBe(address2.id);
    expect(address2.number).not.toBe(null);
    expect(address2.zipcode).not.toBe(null);
  });

  it("should return the correctly formatted address string from the format method", () => {
    const address = Address.create("Rua A", 123, "Itapecerica", "SP", "12345-678");
    const formattedAddress = address.format();
    const expectedFormat = "Rua A, 123, Itapecerica - SP, 12345-678";

    expect(formattedAddress).toBe(expectedFormat);
  });



  // TESTAR ERROS
});
