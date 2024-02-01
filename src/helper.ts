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
// this function takes an array of objects and a key, sorts the array in ascending order based on the values of the specified key, and returns the sorted array.
export function sortByKey(array: any, key: string) {
  return array.sort(function (a: any, b: any) {
    var x = a[key];
    var y = b[key];
    return x < y ? -1 : x > y ? 1 : 0;
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
