import axios from "axios";

export default () => {
  // const token = store.getters.getToken;

  const apiClient = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      // authorization: token || undefined
      // authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwiaWF0IjoxNTg4MjQyNjY4LCJleHAiOjE1ODgyNDYyNjh9.30Gci9O46pWucelELZthOUezpUIQy2xM5SUxdwLCrPI`,
    },
  });

  apiClient.interceptors.response.use(
    (response) => {
      return Promise.resolve(response);
      // return response
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
