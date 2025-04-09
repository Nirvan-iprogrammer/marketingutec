import axios from "axios";
import Amplify, { Auth } from "aws-amplify";
import { BASE_URL, ENVIRONMENT } from "./api-endpoints";

// Configure AWS Amplify with your Cognito settings
// Amplify.configure({
//   Auth: {
//     region: "your-cognito-region",
//     userPoolId: "your-user-pool-id",
//     userPoolWebClientId: "your-client-id",
//   },
// });

// Function to get the AWS Cognito ID token
export const getIdToken = async () => {
  try {
    const session = await Auth.currentSession();
    return session.getIdToken().getJwtToken();
  } catch (error) {
    console.error("Error fetching ID token:", error);
    throw error;
  }
};

// Function to refresh the AWS Cognito tokens using the refresh token
const refreshAuthToken = async () => {
  try {
    const session = await Auth.currentSession();
    const refreshToken = session.getRefreshToken();
    const refreshedSession = await Auth.signIn(
      session.getUsername(),
      refreshToken
    );
    return refreshedSession.getIdToken().getJwtToken();
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw error;
  }
};

// Create Axios instance with interceptor
const createAxiosInstance = () => {
  const axiosInstance = axios.create({
    baseURL: BASE_URL + "/" + ENVIRONMENT, // Replace with your API base URL
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Request interceptor
  axiosInstance.interceptors.request.use(async (config) => {
    // Attach the AWS Cognito ID token to the Authorization header
    const idToken = await getIdToken();
    config.headers.moduleid = 0;
    config.headers.Authorization = `Bearer ${idToken}`;
    return config;
  });

  // Response interceptor
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      // Handle unauthorized errors and refresh the token
      if (error.response && error.response.status === 401) {
        try {
          const newToken = await refreshAuthToken();
          // Retry the original request with the new token
          const config = error.config;
          config.headers.Authorization = `Bearer ${newToken}`;
          return axiosInstance(config);
        } catch (refreshError) {
          // If refreshing token fails, you may want to redirect to login or handle it accordingly
          console.error("Error refreshing token:", refreshError);
          throw refreshError;
        }
      }

      // For other errors, simply forward the error
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

// Usage:
export const axiosInstance = createAxiosInstance();
// Now you can use axiosInstance for making requests, and it will automatically handle authentication and refresh tokens.
