import { CustomError } from "../../error/customError";
import Address from "../valueObjects/address";

export class Validator {
  static validateAddress(
    addressLine: string,
    number: string | number,
    city: string,
    state: string,
    zipCode?: string
  ): void {
    if (!addressLine || addressLine.trim() === "") {
      throw new CustomError(419, "O campo 'Endereço' não deve ser vazio.");
    }
    if (addressLine.length < 3) {
      throw new CustomError(419, "O campo 'Endereço' deve ter pelo menos 3 caracteres.");
    }
    if (addressLine.length > 70) {
      throw new CustomError(419, "O campo 'Endereço' deve ter no máximo 70 caracteres.");
    }

    if (typeof number === "string" && number !== "S/N" && isNaN(Number(number))) {
      throw new CustomError(419, "O campo 'Número' deve ser um número válido.");
    }
    if (typeof number === "number" && number <= 0) {
      throw new CustomError(419, "O campo 'Número' deve ser maior que zero.");
    }

    if (!city || city.trim() === "") {
      throw new CustomError(419, "O campo 'Cidade' não deve ser vazio.");
    }
    if (city.length < 2) {
      throw new CustomError(419, "O campo 'Cidade' deve ter pelo menos 2 caracteres.");
    }
    if (city.length > 50) {
      throw new CustomError(419, "O campo 'Cidade' deve ter no máximo 50 caracteres.");
    }

    if (!state || state.trim() === "") {
      throw new CustomError(419, "O campo 'Estado' não deve ser vazio.");
    }
    if (!/^[A-Z]{2}$/.test(state)) {
      throw new CustomError(419, "O campo 'Estado' deve conter exatamente 2 letras maiúsculas.");
    }

    // Lista de siglas de estados brasileiros (incluindo o Distrito Federal)
    const estadosBrasileiros = [
      "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", 
      "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", 
      "RS", "RO", "RR", "SC", "SP", "SE", "TO"
    ];

    if (!estadosBrasileiros.includes(state)) {
      throw new CustomError(419, "O campo 'Estado' deve ser uma sigla válida de um estado brasileiro.");
    }

    if (!zipCode || zipCode.trim() === "") {
      zipCode = "00000-000";
    }
    if (!/^\d{5}-\d{3}$/.test(zipCode)) {
      throw new CustomError(419, "O campo 'CEP' deve estar no formato 00000-000.");
    }
  }

  static validateEmail(emailAddress: string): void {
    if (!emailAddress || emailAddress.trim() === "") {
      throw new CustomError(419, "O campo 'E-mail' não deve ser vazio.");
    }
    if (emailAddress.length > 255) {
      throw new CustomError(419, "O campo 'E-mail' deve ter no máximo 255 caracteres.");
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailAddress)) {
      throw new CustomError(419, "O campo 'E-mail' deve conter um endereço de e-mail válido.");
    }
  }

  static validatePassword(password: string): void {
    if (!password || password.trim() === "") {
      throw new CustomError(419, "O campo 'Senha' não deve ser vazio.");
    }
    if (password.length < 8) {
      throw new CustomError(419, "A 'Senha' deve ter pelo menos 8 caracteres.");
    }
    if (!/[A-Z]/.test(password)) {
      throw new CustomError(419, "A 'Senha' deve conter pelo menos uma letra maiúscula.");
    }
    if (!/[a-z]/.test(password)) {
      throw new CustomError(419, "A 'Senha' deve conter pelo menos uma letra minúscula.");
    }
    if (!/[0-9]/.test(password)) {
      throw new CustomError(419, "A 'Senha' deve conter pelo menos um número.");
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      throw new CustomError(419, "A 'Senha' deve conter pelo menos um caractere especial.");
    }
  }
}
