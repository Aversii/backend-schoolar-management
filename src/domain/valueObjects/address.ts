import { Validator } from "../validations/validator";

export type AddressProps = {
  addressLine: string;
  number: number | string;
  city: string;
  state: string;
  zipCode: string;
};

export default class Address {
  private constructor(private addressData: AddressProps) {}

  public static create(
    addressLine: string, 
    number: number | string, 
    city: string, 
    state: string, 
    zipCode: string
  ): Address {
    const finalZipCode = zipCode || "00000-000";
    const finalNumber = number || "S/N";
    Validator.validateAddress(addressLine, finalNumber, city, state, finalZipCode);

    return new Address({
      addressLine,
      number: finalNumber,
      city,
      state,
      zipCode: finalZipCode,
    });
  }

  public static with(data: AddressProps): Address {
    return new Address(data);
  }

  public get addressLine(): string {
    return this.addressData.addressLine;
  }

  public get number(): number | string {
    return this.addressData.number;
  }

  public get city(): string {
    return this.addressData.city;
  }

  public get state(): string {
    return this.addressData.state;
  }

  public get zipCode(): string {
    return this.addressData.zipCode;
  }

  public format(): string {
    return `${this.addressData.addressLine}, ${this.addressData.number}, ${this.addressData.city} - ${this.addressData.state}, ${this.zipCode}`;
  }

}
