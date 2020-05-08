import api from "./api";

export default {
  getCategories(params: any) {
    return api().get(`products`, { params });
  },
};
