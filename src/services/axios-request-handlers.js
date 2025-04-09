import { BASE_URL,ENDPOINT } from "config/api-endpoints";
import { axiosInstance } from "../config/Axios";
import toast from "react-hot-toast";
import { ENVIRONMENT } from "config/api-endpoints";
import axios from "axios";


export const refreshToken = async () => {
  try {
    const resp = await GET("auth/refresh");
    console.log("refresh token", resp.data);
    return resp.data;
  } catch (e) {
    console.log("Error", e);
  }
};

export const GET = async (path, params = "") => {
  const response = await axiosInstance.get(`${path}${params}`);
  if (response) {
    return {
      response,
      status: response.status,
    };
  }
};

export const POST = async (path, payload = {}) => {  
  try {
    const response = await axiosInstance.post(path, payload);
    if (response) {
      return {
        response,
        status: response.status,
      };
    }
  } catch (error) {
    toast.error(
      error?.response?.data?.message || error?.message || "Something went wrong"
    );
    return error
  }
};

export const PUT = async (path, payload) => {
  const response = await axiosInstance.put(path, payload);
  if (response) {
    return {
      response,
      status: response.status,
    };
  }
};

export const DELETE = async (path, payload) => {
  const response = await axiosInstance.delete(path, { data: payload });
  if (response) {
    return {
      response,
      status: response.status,
    };
  }
};


export const checkUserExistRequest = async (email) => {
  try {
    const config = {
      method: "post",
      url: BASE_URL + "/" + ENVIRONMENT + ENDPOINT.CHECK_USER_EXIST,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(email),
    };
    const resp = await axios.request(config);
    return resp.data?.data?.userExist;
  } catch (error) {
    return toast.error(error.message);
  }
};