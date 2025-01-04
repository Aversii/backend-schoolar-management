import { Validator } from '../validations/validator';

export type EmailProps = {
  emailAddress: string;
};

export default class Email {

  private constructor(private emailData: EmailProps) {}

  public static create(emailAddress: string): Email {
    Validator.validateEmail(emailAddress);
    return new Email({ emailAddress });
  }

  public static with(data: EmailProps): Email {
    Validator.validateEmail(data.emailAddress);
    return new Email(data);
  }

  public get emailAddress(): string {
    return this.emailData.emailAddress;
  }

  public format(): string {
    return this.emailData.emailAddress.toLowerCase().trim();
  }
}
