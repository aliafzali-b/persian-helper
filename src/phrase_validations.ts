import { normalize_digits } from "./helper";

export function is_national_code_valid(
  input: number | string | undefined | null
): boolean {
  if (input == null) return false;
  input = normalize_digits(input.toString());
  if (!/^\d{10}$/.test(input.toString())) return false;
  var check = parseInt(input.toString()[9]);
  var sum =
    Array(9)
      .fill(undefined)
      //@ts-ignore
      .map((_, i) => parseInt(input.toString()[i]) * (10 - i))
      .reduce((x, y) => x + y) % 11;
  return (sum < 2 && check == sum) || (sum >= 2 && check + sum == 11);
}
export function is_phone_number_valid(
  phoneNumber: number | string | undefined | null
): boolean {
  if (phoneNumber == null) return false;
  phoneNumber = normalize_digits(phoneNumber.toString());
  const iranianPhoneNumberRegex = /^(\+98|0098|0)[1-9]\d{9}$/;
  return iranianPhoneNumberRegex.test(phoneNumber.toString());
}
export function is_sayad_id_code_valid(
  sayad_id: string | undefined | null
): boolean {
  if (sayad_id == null) return false;
  return sayad_id.length === 16;
}
export function is_percent_valid(
  percent: number | string | undefined | null
): boolean {
  if (percent == null) return false;
  if (typeof percent === "string") {
    const percentValue = parseFloat(percent);
    return !isNaN(percentValue) && percentValue >= 0 && percentValue <= 100;
  }
  if (typeof percent === "number") {
    return percent >= 0 && percent <= 100;
  }
  return false;
}
export function is_IPv4_valid(ip: any): boolean {
  if (ip == null) return false;
  if (typeof ip === "function") return false;
  if (typeof ip === "object" && !Array.isArray(ip)) return false;
  const regexPattern =
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  return regexPattern.test(ip.toString());
}
export function is_only_digits(value: any): boolean {
  if (value == null) return false;
  if (typeof value === "function") return false;
  if (typeof value === "object" && !Array.isArray(value)) return false;

  return /^-?\d+$/.test(normalize_digits(value.toString()));
}
export function is_empty(str: any): boolean {
  if (str == null) return true;
  if (typeof str === "function") return false;
  if (typeof str === "object" && !Array.isArray(str)) return false;
  return str.toString().trim().length === 0;
}
export function is_email_valid(email: any): boolean {
  if (email == null) return false;
  return email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}
export function is_id_valid(id: any): boolean {
  if (!id) return false;
  return is_only_digits(id);
}
export function is_number_valid(value: any): boolean {
  if (typeof value === "function") return false;
  if (typeof value === "object" && !Array.isArray(value)) return false;
  if (isNaN(value)) return false;
  return true;
}
export function is_english_string(
  input: string,
  include_digits?: boolean
): boolean {
  if (is_empty(input)) return false;
  let regexPattern = "^[a-zA-Z";
  if (include_digits) {
    regexPattern += "0-9";
  }
  regexPattern += "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~\\s]*$";
  const englishRegex = new RegExp(regexPattern);
  return englishRegex.test(input.toString());
}
export function is_persian_string(
  input: string,
  include_digits?: boolean
): boolean {
  if (is_empty(input)) return false;
  let regexPattern = "^[\u0600-\u06FF";
  if (include_digits) {
    // Unicode range for Persian and English digits
    regexPattern += "\u06F0-\u06F90-9";
  }
  regexPattern += "\\s]*$";
  const persianRegex = new RegExp(regexPattern);
  return persianRegex.test(input.toString());
}

export function is_username_valid(username: string): boolean {
  //username can contain English letters (both uppercase and lowercase), digits, underscores, and must be between 3 and 16 characters long
  if (is_empty(username)) return false;
  const usernameRegex = /^[a-zA-Z0-9_]{3,16}$/;
  return usernameRegex.test(username);
}
