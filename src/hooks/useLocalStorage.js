import { useState } from "react";

export const useLocalStorage = (keyName, defaultValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = window.localStorage.getItem(keyName);
      if (value) {
        return JSON.parse(value);
      } else {
        window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (err) {
      return defaultValue;
    }
  });
  const setValue = (newValue) => {
    try {
      window.localStorage.setItem(keyName, JSON.stringify(newValue));
    } catch (err) {}
    setStoredValue(newValue);
  };
  return [storedValue, setValue];
};

export const setTokenToLocalStorage = (value) => {
  try {
    window.localStorage.setItem(
      "token",
      JSON.stringify(value).replace(/"/g, "")
    );
  } catch (error) {
    console.error("Failed to store token to locastorage :", error);
  }
};

export const getTokenFromLocalStorage = () => {
  try {
    const token = window.localStorage.getItem("token");
    if (token) {
      return JSON.parse(token);
    } else {
      throw new Error("Failed to read token to localstorage");
    }
  } catch (error) {
    console.error("Failed to read token to localstorage :", error);
  }
};

export const clearLocalStorage = () => {
  window.localStorage.clear();
};
