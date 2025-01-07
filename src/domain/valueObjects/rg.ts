import { CustomError } from "../../error/customError";

export type RgProps = {
    rgNumber: string;
};

export default class Rg {
    private constructor(private rgData: RgProps) {}

    public static create(rgNumber: string): Rg {
        if (!this.isValidRg(rgNumber)) {
            throw new CustomError(419, "Invalid RG format");
        }
        return new Rg({ rgNumber: this.formatRg(rgNumber) });
    }

    public static with(data: RgProps): Rg {
        return new Rg(data);
    }

    public get rgNumber(): string {
        return this.rgData.rgNumber;
    }

    private static isValidRg(rg: string): boolean {
        rg = rg.replace(/\D/g, '');

        if (rg.length !== 9 || /^(\d)\1{8}$/.test(rg)) {
            return false;
        }

        const digits = rg.substring(0, 8);
        const verifierDigit = rg[8];

        const calculatedVerifier = this.calculateVerifierDigit(digits);
        if (verifierDigit !== calculatedVerifier) {
            return false;
        }

        return true;
    }

    private static calculateVerifierDigit(digits: string): string {
        let sum = 0;

        for (let i = 0; i < 8; i++) {
            sum += parseInt(digits[i]) * (9 - i);
        }

        const remainder = sum % 11;

        if (remainder === 10 || remainder === 11) {
            return '0';
        }

        return remainder.toString();
    }

    private static formatRg(rg: string): string {
        return rg.replace(/\D/g, '')
            .replace(/(\d{2})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    }
}
