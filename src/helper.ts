export function thousands_split(n: any, mark?: string): string {
  if (!n || n.length === 0) return "0";
  if (n === "-") return "-";
  let marker = mark;
  let number = n;
  number = Math.floor(Number(n));
  if (!marker || marker.length === 0) marker = ",";
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, marker);
}
export function getCookie(cname: string) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
export function setCookie(cname: string, cvalue: string, exdays: number) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
export function eraseCookie(cname: string) {
  document.cookie = cname + "=; Max-Age=-99999999;";
  /* var cookies = document.cookie.split(";");
  
      for (var i = 0; i < cookies.length; i++) {
          var cookie = cookies[i];
          var eqPos = cookie.indexOf("=");
          var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
          document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
      } */
}

// Function to sort array of objects by key and order
export function sort_by_key(
  array: any[],
  key: string,
  order: "asc" | "desc" = "asc"
): any[] {
  return array.sort(function (a: any, b: any) {
    var x = a[key];
    var y = b[key];

    // Handle null values
    if (x === null && y === null) {
      return 0;
    } else if (x === null) {
      return order === "asc" ? -1 : 1; // Treat null as smaller
    } else if (y === null) {
      return order === "asc" ? 1 : -1; // Treat null as larger
    }

    // Compare non-null values
    if (typeof x === "string" && typeof y === "string") {
      if (order === "asc") {
        return x.localeCompare(y);
      } else {
        return y.localeCompare(x);
      }
    } else {
      // Fallback to default comparison for non-string values
      if (order === "asc") {
        return x < y ? -1 : x > y ? 1 : 0;
      } else {
        return x > y ? -1 : x < y ? 1 : 0;
      }
    }
  });
}

export const filter_model_to_url_search_params_string = (obj?: any) => {
  if (!obj) return "";
  let params = new URLSearchParams();
  Object.entries(obj).forEach(([key, value]: any[]) => {
    if (
      value !== null &&
      typeof value != "undefined" &&
      value !== "" &&
      value !== "null"
    ) {
      if (Array.isArray(value)) {
        if (typeof value === "object") {
          //obj or array
          value.forEach((v: any) => {
            params.append(key, v);
          });
        }
      } else {
        if (value !== "") params.append(key, value.toString());
      }
    }
  });
  let params_string = params.toString();
  if (params_string.length > 0) params_string = "?" + params_string;
  return params_string;
};
export function removeDuplicates(arr: any[]): any[] {
  const seen = new Set();
  return arr.filter((item) => {
    const isUnique = !seen.has(item.id);
    if (isUnique) {
      seen.add(item.id);
    }
    return isUnique;
  });
}
export const attach_array_to_formData = (
  formData: FormData,
  array: any[],
  key: string
) => {
  if (array && array.length > 0) {
    array.forEach((item) => {
      formData.append(key, item);
    });
  } else {
    formData.append(key, "");
  }
  return formData;
};

export function cloneDeep<T>(object: T): T {
  if (object == null) return object;
  return JSON.parse(JSON.stringify(object));
}
export function isNullOrUndefined(value: any): boolean {
  if (value === null || value === undefined) return true;
  else return false;
}

// T is expected type of parsed data
export function safelyParseJson<T, K>(data: string, resultIfError: K): T | K {
  if (!data) return resultIfError;
  try {
    const parsedData = JSON.parse(data);
    return parsedData;
  } catch (e) {
    console.error(e);
    return resultIfError;
  }
}
enum PasswordStrength {
  VeryWeak = "Very Weak",
  Weak = "Weak",
  Medium = "Medium",
  Strong = "Strong",
  VeryStrong = "Very Strong",
}

export function check_password_strength(password: string): PasswordStrength {
  // Define regex patterns for different strength levels with shorter lengths
  const veryWeakRegex = /^(?=.*[a-z]).{4,}$/; // At least one lowercase letter and minimum length 4
  const weakRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/; // At least one lowercase and one uppercase letter, minimum length 6
  const mediumRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/; // At least one lowercase letter, one uppercase letter, one digit, minimum length 8
  const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{10,}$/; // At least one lowercase letter, one uppercase letter, one digit, and one special character, minimum length 10
  const veryStrongRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{12,}$/; // At least one lowercase letter, one uppercase letter, one digit, and one special character, minimum length 12

  if (veryStrongRegex.test(password.toString())) {
    return PasswordStrength.VeryStrong;
  } else if (strongRegex.test(password.toString())) {
    return PasswordStrength.Strong;
  } else if (mediumRegex.test(password.toString())) {
    return PasswordStrength.Medium;
  } else if (weakRegex.test(password.toString())) {
    return PasswordStrength.Weak;
  } else if (veryWeakRegex.test(password.toString())) {
    return PasswordStrength.VeryWeak;
  } else {
    return PasswordStrength.VeryWeak; // Default to very weak if none of the patterns match
  }
}
export function normalize_digits(value: string): string {
  const digitMap: { [key: string]: string } = {
    "۰": "0",
    "١": "1",
    "٢": "2",
    "٣": "3",
    "٤": "4",
    "٥": "5",
    "٦": "6",
    "٧": "7",
    "٨": "8",
    "٩": "9",
    // Arabic-Indic
    //"۰": "0",
    "۱": "1",
    "۲": "2",
    "۳": "3",
    "۴": "4",
    "۵": "5",
    "۶": "6",
    "۷": "7",
    "۸": "8",
    "۹": "9",
    // Eastern Arabic
    "०": "0",
    "१": "1",
    "२": "2",
    "३": "3",
    "४": "4",
    "५": "5",
    "६": "6",
    "७": "7",
    "८": "8",
    "९": "9",
    // Devanagari
  };
  return value.replace(/[۰-۹٠-٩०-९]/g, (digit) => digitMap[digit] || digit);
}
export function normalize_chars(value: string): string {
  value = value.replace("ك", "ک");
  value = value.replace("ي", "ی");
  return value;
}
