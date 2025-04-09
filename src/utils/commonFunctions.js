import { ENDPOINT } from "config/api-endpoints";
import { POST } from "services/axios-request-handlers";
import toast from "react-hot-toast";
import awsExports from "config/aws-exports";

export const generateUniqueID = () => {
  return "xxxx-4xxx-yxxx-xxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 3) | 8;
    return v.toString(16);
  });
};
export const checkFileSize = (file, sizeInMB) => {
  let filesize = file?.size / 1000000;
  let response = false;
  if (filesize && filesize > sizeInMB) {
    response = false;
  } else {
    response = true;
  }
  return response;
};

export const checkImageDimension = async (
  acceptedFiles,
  minWidth,
  minHeight,
  isExact = false
) => {
  let response = false;
  const checkDimensions = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;
        img.onload = () => {
          const isValidDimensions = isExact
            ? img?.width === minWidth && img?.height === minHeight
            : img?.width >= minWidth && img?.height >= minHeight;
          if (isValidDimensions) {
            resolve(true);
          } else {
            resolve(false);
          }
        };
      };

      reader.readAsDataURL(file);
    });
  };

  for (const file of acceptedFiles) {
    const isValid = await checkDimensions(file);
    if (isValid) {
      response = true;
      break;
    }
  }
  return response;
};

export const getPresignedUrl = async (payload, file) => {
  try {
    const resp = await POST(ENDPOINT.GET_PRESIGNED_URL, payload);
    let res = resp?.response?.data;
    if (res?.data && res?.statusCode === 200) {
      const response = res?.data?.data;
      return response;
    } else {
      toast.error("Something went wrong");
    }
  } catch (error) {
    console.log(error?.response);
    toast.error(error?.message || "Something went wrong");
  }
};

export const convertPayloadToQueryString = (payload) => {
  const queryString = Object.keys(payload)
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(payload[key])}`
    )
    .join("&");

  return queryString.length > 0 ? `?${queryString}` : "";
};
export const convertPayloadToQueryStringWithoutEncode = (payload) => {
  const queryString = Object.keys(payload)
    .map((key) => `${key}=${payload[key]}`)
    .join("&");

  return queryString.length > 0 ? `?${queryString}` : "";
};

export const generatePassword = () => {
  const minLength = 8;
  const maxLength = 12;
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const numberChars = "0123456789";
  const symbolChars = "!@#$%^&*()-_=+[]{}|;:,.<>?";

  const allChars = uppercaseChars + lowercaseChars + numberChars + symbolChars;

  let password = "";

  // Ensure at least one character from each character set
  password += getRandomChar(uppercaseChars);
  password += getRandomChar(lowercaseChars);
  password += getRandomChar(numberChars);
  password += getRandomChar(symbolChars);

  // Generate remaining characters
  const remainingLength = Math.max(minLength - password.length, 0);
  for (let i = 0; i < remainingLength; i++) {
    password += getRandomChar(allChars);
  }

  // Shuffle the password to ensure randomness
  password = password
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");

  // Trim to maximum length
  password = password.slice(0, maxLength);

  return password;
};

function getRandomChar(characters) {
  const randomIndex = Math.floor(Math.random() * characters.length);
  return characters.charAt(randomIndex);
}

export const convertDateFormat = (inputDate) => {
  // Parse the input date string
  const date = new Date(inputDate);

  // Get the individual components of the date
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  let ampm = "AM";

  // Convert hours to 12-hour format and determine AM/PM
  if (hours > 12) {
    hours -= 12;
    ampm = "PM";
  }

  // Format the date as "DD-MM-YYYY hh:MM AM/PM"
  const formattedDate = `${day}-${month}-${year} ${hours}:${minutes} ${ampm}`;

  return formattedDate;
};

export const validateImageFile = (file) => {
  let isValid = false;
  const acceptedFiles = ["png", "jpeg", "jpg"];
  const extension = file?.name?.split(".").pop();
  if (acceptedFiles?.includes(extension?.toLowerCase())) {
    isValid = true;
  }
  return isValid;
};

export const validateName = (name) => {
  // Check for numeric characters
  if (/\d/.test(name)) {
    return "Name should not contain numeric characters.";
  }

  // Check for special characters
  if (/[^A-Za-z0-9 ]/.test(name)) {
    return "Name should not contain special characters.";
  }

  // Check for numeric special characters
  if (/[^A-Za-z ]/.test(name)) {
    return "Name should not contain numeric special characters.";
  }

  // Check for spaces
  // if (/\s/.test(name)) {
  //   return "Name should not contain spaces.";
  // }

  return null; // Validation passed
};

export function capitalizeFirstCharacter(sentence) {
  if (sentence?.length === 0) {
    return sentence;
  }
  return sentence?.charAt(0).toUpperCase() + sentence?.slice(1);
}

export const getThumbnailImgPath = (path) => {
  if (path) {
    return `${awsExports?.S3_BASE_URL}thumbnails/${path}`;
  } else {
    return "";
  }
};

export const getImagePath = (path) => {
  if (path) {
    return `${awsExports.S3_BASE_URL}${path}`;
  } else {
    return "";
  }
};

export const base64ToFile = (base64String, filename) => {
  // Remove the prefix from the base64 string
  const base64WithoutPrefix = base64String.split(";base64,").pop();

  // Convert the base64 string to binary data
  const binaryString = atob(base64WithoutPrefix);

  // Create a Uint8Array to hold the binary data
  const byteArray = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    byteArray[i] = binaryString.charCodeAt(i);
  }

  // Create a Blob from the binary data
  const blob = new Blob([byteArray], { type: "image/png" });

  // Create a File object from the Blob
  return new File([blob], filename, { type: "image/png" });
};

function base64ToBlob(base64Data, contentType) {
  const byteCharacters = atob(base64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters?.length; offset += 512) {
      const slice = byteCharacters?.slice(offset, offset + 512);
      const byteNumbers = new Array(slice?.length);
      for (let i = 0; i < slice?.length; i++) {
          byteNumbers[i] = slice?.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, { type: contentType });
}

export function base64UrlToFile(base64Url, fileName) {
  const [prefix, base64Data] = base64Url?.split(',');
  const mime = prefix?.match(/:(.*?);/)[1];

  const blob = base64ToBlob(base64Data, mime);
  let file = new File([blob], fileName, { type: mime });
  return [file]
}

