export async function convert_URL_to_file(
  url: string | undefined
): Promise<File | null> {
  if (!url) return null;
  try {
    // Fetch the file content from the URL
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch the file from ${url}`);
    }

    // Get the content type from the response headers
    const contentType =
      response.headers.get("content-type") || "application/octet-stream";

    // Extract the file name from the URL or use a default name
    const fileName = url.substring(url.lastIndexOf("/") + 1) || "file";

    // Convert the response data to a blob
    const blob = await response.blob();

    // Create a File from the blob
    const file = new File([blob], fileName, { type: contentType });

    return file;
  } catch (error) {
    console.error(error);
    return null;
  }
}
export const convert_object_to_formData = (send_obj: any, skipKeys: any[]) => {
  const formData = new FormData();
  (Object.keys(send_obj) as Array<keyof typeof send_obj>).forEach((key) => {
    if (skipKeys.includes(key)) return;
    let newValue = send_obj[key];
    if (Array.isArray(newValue)) {
      for (var i = 0; i < newValue.length; i++) {
        formData.append(key.toString(), newValue[i].toString());
      }
    } else if (newValue != null) {
      formData.append(key.toString(), newValue.toString());
    } else {
      formData.append(key.toString(), "");
    }
  });
  return formData;
};
