const BirthCertificate = require("../../../domain/valueObjects/birthCertificate").default;
import { CustomError } from "../../../error/customError";

describe('BirthCertificate', () => {
  describe('create', () => {
    it('should create a new certificate with the provided data', () => {
      const certificateFullData = BirthCertificate.create('12345', 'Livro 1', '12',  new Date(), 'Father Name', 'Mother Name', 'City', 'Registry Office', 'SP');
      const certificateWithRequiredArgument = BirthCertificate.create('12345', 'Livro 1', '12')

      
      expect(certificateFullData).toBeInstanceOf(BirthCertificate);
      expect(certificateFullData.number).toBe('12345');
      expect(certificateFullData.book).toBe('Livro 1');
      expect(certificateFullData.page).toBe('12');
      expect(certificateFullData.fatherName).toBe('Father Name');

      expect(certificateWithRequiredArgument).toBeInstanceOf(BirthCertificate);
      expect(certificateWithRequiredArgument.number).toBe('12345');
      expect(certificateWithRequiredArgument.book).toBe('Livro 1');
      expect(certificateWithRequiredArgument.page).toBe('12');
      expect(certificateWithRequiredArgument.fatherName).toBe(undefined);
    });
  });

  it("should create a new birth certificate with only number data",()=>{
    let certificate = BirthCertificate.create("12345678912345678912345678912312")
    expect(certificate).toBeInstanceOf(BirthCertificate)
  })

  describe('with', () => {
    it('should create a new certificate from the provided object', () => {
      const certificateData = {
        number: '12345',
        book: 'Livro 1',
        page: '12',
        record: '345',
        registrationDate: new Date(),
        fatherName: 'Father Name',
        motherName: 'Mother Name',
        naturalness: 'City',
        registryOffice: 'Registry Office',
        state: 'SP',
      };
      const certificate = BirthCertificate.with(certificateData);
      expect(certificate).toBeInstanceOf(BirthCertificate);
      expect(certificate.number).toBe('12345');
      expect(certificate.fatherName).toBe('Father Name');
      expect(certificate.state).toBe('SP');
    });
  });

  describe('validate', () => {
    it('should throw an error if the state is invalid', () => {
      const certificate = BirthCertificate.create('12345', 'Livro 1', '12', '345', new Date(), 'Father Name', 'Mother Name', 'City', 'Registry Office', 'XYZ');
      expect(() => certificate['validate']()).toThrow(new CustomError(419, "Estado (UF) inválido"));
    });

    it('should throw an error if the number format is invalid for the new model', () => {
      const certificate = BirthCertificate.create('1234', undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 'SP');
      expect(() => certificate['validate']()).toThrow(new CustomError(419, "Número da certidão no formato inválido"));
    });

    it('should throw an error if the book format is invalid in the old model', () => {
      const certificate = BirthCertificate.create('12345', 'Livro 9999', '12', '345', undefined, undefined, undefined, undefined, undefined, 'SP');
      expect(() => certificate['validate']()).toThrow(new CustomError(419, "Formato do livro inválido"));
    });
  });

  describe('formatOldModel', () => {
    it('should format the old model correctly', () => {
      const certificate = BirthCertificate.create('12345', 'Livro 1', '12', '345');
      const formatted = certificate.formatOldModel();
      expect(formatted).toBe('Livro 1-12 - 12345');
    });
  });

  describe('formatNewModel', () => {
    it('should format the new model correctly', () => {
      const certificate = BirthCertificate.create('12345678912345678912345678912312');
      const formatted = certificate.formatNewModel();
      expect(formatted).toBe('123456 7 8912345 67 8 9123456 789 123 12');
    });
  });
});
