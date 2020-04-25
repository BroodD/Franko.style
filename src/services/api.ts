import axios from "axios";

export default () => {
  // const token = store.getters.getToken;

  const apiClient = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      // authorization: token || undefined
    },
  });

  apiClient.interceptors.response.use(
    (response) => {
      return Promise.resolve(response);
      // return response
    },
    (error) => {
      if (error.response && error.response.status === 401) {
        // store.dispatch('setUser', {
        // 	token: '',
        // 	userId: ''
        // })
        // app.$goToPage(Wellcome)
      }
      return Promise.reject(error);
    }
  );

  return apiClient;
};
