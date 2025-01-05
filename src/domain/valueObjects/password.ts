import { Validator } from '../validations/validator';

export type PasswordProps = {
  password: string;
};

export default class Password {

  private constructor(private passwordData: PasswordProps) {}

  public static create(password: string): Password {
    Validator.validatePassword(password);
    return new Password({ password });
  }

  public static with(data: PasswordProps): Password {
    Validator.validatePassword(data.password);
    return new Password(data);
  }

}
