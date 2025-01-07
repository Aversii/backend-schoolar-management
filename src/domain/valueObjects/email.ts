import { Validator } from '../validations/validator';

export type EmailProps = {
  emailAddress: string;
};

export default class Email {

  private constructor(private emailData: EmailProps) {}

  public static create(emailAddress: string): Email {
    Validator.validateEmail(emailAddress);
    return new Email({ emailAddress: this.format(emailAddress) });
  }

  public static with(data: EmailProps): Email {
    return new Email(data);
  }

  public get emailAddress(): string {
    return this.emailData.emailAddress;
  }

  private static format(emailAddress:string): string {
    return emailAddress.toLowerCase().trim();
  }
}
