import api from "./api";

export default {
  getProduct(params: any) {
    return api().get(`products/${params.id}`, { params });
  },
  getProducts(params: any) {
    return api().get(`products`, { params });
  },
  getLovedProducts(params: any) {
    return api().get(`products/loved`, { params });
  },
  putLovedProduct(params: any) {
    return api().put(`products/${params.id}/loved`, { params });
  },
};
