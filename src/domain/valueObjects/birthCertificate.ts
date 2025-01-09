import { CustomError } from "../../error/customError";

export type BirthCertificateProps = {
  number: string;
  book?: string;
  page?: string;
  registrationDate?: Date;
  fatherName?: string;
  motherName?: string;
  naturalness?: string;
  registryOffice?: string;
  state?: string;
};

export default class BirthCertificate {
  private constructor(private certificateData: BirthCertificateProps) {}

  public static create(
    number: string,
    book?: string,
    page?: string,
    registrationDate?: Date,
    fatherName?: string,
    motherName?: string,
    naturalness?: string,
    registryOffice?: string,
    state?: string
  ): BirthCertificate {
    return new BirthCertificate({
      number,
      book,
      page,
      registrationDate,
      fatherName,
      motherName,
      naturalness,
      registryOffice,
      state,
    });
  }

  public static with(data: BirthCertificateProps): BirthCertificate {
    return new BirthCertificate(data);
  }

  public get number(): string {
    return this.certificateData.number;
  }

  public get book(): string | undefined {
    return this.certificateData.book;
  }

  public get page(): string | undefined {
    return this.certificateData.page;
  }

  public get registrationDate(): Date | undefined {
    return this.certificateData.registrationDate;
  }

  public get fatherName(): string | undefined {
    return this.certificateData.fatherName;
  }

  public get motherName(): string | undefined {
    return this.certificateData.motherName;
  }

  public get naturalness(): string | undefined {
    return this.certificateData.naturalness;
  }

  public get registryOffice(): string | undefined {
    return this.certificateData.registryOffice;
  }

  public get state(): string | undefined {
    return this.certificateData.state;
  }

  public formatOldModel(): string {
    const { number, book, page } = this.certificateData;
    return `${book}-${page} - ${number}`;
  }

  public formatNewModel(): string {
    const { number } = this.certificateData;
  
    if (number.length !== 32) {
      throw new CustomError(419, "Número da certidão deve ter 32 dígitos para o formato novo");
    }
  
    return `${number.slice(0, 6)} ${number.slice(6, 7)} ${number.slice(7, 14)} ${number.slice(14, 16)} ${number.slice(16, 17)} ${number.slice(17, 24)} ${number.slice(24, 27)} ${number.slice(27, 30)} ${number.slice(30, 32)}`;
  }
  

  private validate(): void {
    const { number, book, page,  state } = this.certificateData;

    if (book && page) {
      this.validateOldModel(number, book, page);
    } else {
      this.validateNewModel(number);
    }

    if (state && !this.isValidState(state)) {
      throw new CustomError(419, "Estado (UF) inválido");
    }
  }

  private validateNewModel(number: string): void {
    const regex = /^\d{32}$/;
    if (!regex.test(number)) {
      throw new CustomError(419, "Número da certidão no formato inválido");
    }
  }

  private validateOldModel(
    number: string,
    book: string,
    page: string,
  ): void {
    if (!number || !book || !page ) {
      throw new CustomError(419, "Todos os campos devem estar preenchidos");
    }

    const bookRegex = /^Livro \d{1,3}$/;
    if (!bookRegex.test(book)) {
      throw new CustomError(419, "Formato do livro inválido");
    }

    const pageRegex = /^\d{1,4}$/;
    if (!pageRegex.test(page)) {
      throw new CustomError(419, "Formato da página inválido");
    }

  }

  private isValidState(state: string): boolean {
    const validStates = [
      "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA",
      "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN",
      "RS", "RO", "RR", "SC", "SP", "SE", "TO"
    ];
    return validStates.includes(state);
  }
}
