export function is_national_code_valid(
  input: number | string | undefined | null
): boolean {
  if (input == null) return false;
  if (!/^\d{10}$/.test(input.toString())) return false;
  var check = parseInt(input.toString()[9]);
  var sum =
    Array(9)
      .fill(undefined)
      .map((_, i) => parseInt(input.toString()[i]) * (10 - i))
      .reduce((x, y) => x + y) % 11;
  return (sum < 2 && check == sum) || (sum >= 2 && check + sum == 11);
}

export function is_phone_number_valid(
  phoneNumber: number | string | undefined | null
): boolean {
  if (phoneNumber == null) return false;
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
export function is_only_digits(value: any) {
  if (value == null) return false;
  if (typeof value === "function") return false;
  if (typeof value === "object" && !Array.isArray(value)) return false;
  return /^-?\d+$/.test(value.toString());
}

export function is_empty(str: any) {
  if (str == null) return true;
  if (typeof str === "function") return false;
  if (typeof str === "object" && !Array.isArray(str)) return false;
  return str.toString().trim().length === 0;
}
