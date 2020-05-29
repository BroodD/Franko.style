import axios from "axios";

export default () => {
  const apiClient = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  apiClient.interceptors.response.use(
    (response) => {
      return Promise.resolve(response);
    },
    (error) => {
      if (error.response) {
        if (error.response.status === 401) {
        }
      }
      return Promise.reject(error);
    }
  );

  return apiClient;
};
