import axios from "axios";
import toast from "react-hot-toast";
import { convertPayloadToQueryString } from "./commonFunctions";
import { ENDPOINT } from "config/api-endpoints";
import { GET } from "services/axios-request-handlers";

export const putUploadUrl = async (path, file) => {
  await axios
    .put(path, file, {
      headers: {
        "Content-Type": file.type,
      },
    })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log("file upload error", err);
      return err;
    });
};

export const uploadFiles = async (url, file) => {
  return await putUploadUrl(url, file)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return null;
    });
};

export const getAllSKU = async () => {
  let result = null;
  let payload = {
    page: 1,
    limit: 100,
  };
  let queryString = convertPayloadToQueryString(payload);
  try {
    let url = `${ENDPOINT.LIST_WEIGHT}${queryString}`;
    const res = await GET(url);
    let resp = res?.response?.data;
    if (resp?.statusCode === 200) {
      result = resp?.data?.data?.rows;
    }
  } catch (error) {
    toast.error(error?.message || "Something went wrong");
  }
  return result;
};

export const getAllCategories = async () => {
  let result = null;
  let payload = {
    page: "",
    limit: "",
    key: "",
  };
  let queryString = convertPayloadToQueryString(payload);
  try {
    let url = `${ENDPOINT.GET_LIST_BY_MASTER_KEY}${queryString}`;
    const res = await GET(url);
    let resp = res?.response?.data;
    if (resp?.statusCode === 200) {
      result = resp?.data?.data;
    } else {
      toast.error("Something went wrong");
    }
  } catch (error) {
    toast.error(error?.message || "Something went wrong");
  }

  return result;
};
