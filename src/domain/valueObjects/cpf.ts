import { CustomError } from "../../error/customError";

export type CpfProps = {
    cpfNumber: string;
};

export default class Cpf {
    private constructor(private cpfData: CpfProps) {}

    public static create(cpfNumber: string): Cpf {
        if (!this.isValidCpf(cpfNumber)) {
            throw new CustomError(419,"Invalid CPF format");
        }
        return new Cpf({ cpfNumber: this.formatCpf(cpfNumber) });
    }

    public static with(data: CpfProps): Cpf {
        return new Cpf(data);
    }

    public get cpfNumber(): string {
        return this.cpfData.cpfNumber;
    }

    private static isValidCpf(cpf: string): boolean {
        cpf = cpf.replace(/\D/g, '');

        if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
            return false;
        }

        let sum = 0;
        let remainder;
        
        for (let i = 1; i <= 9; i++) {
            sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
        }
        remainder = (sum * 10) % 11;
        if ((remainder === 10) || (remainder === 11)) remainder = 0;
        if (remainder !== parseInt(cpf.substring(9, 10))) return false;

        sum = 0;
        for (let i = 1; i <= 10; i++) {
            sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
        }
        remainder = (sum * 10) % 11;
        if ((remainder === 10) || (remainder === 11)) remainder = 0;
        if (remainder !== parseInt(cpf.substring(10, 11))) return false;

        return true;
    }

    private static formatCpf(cpf: string): string {
        return cpf.replace(/\D/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    }


}
