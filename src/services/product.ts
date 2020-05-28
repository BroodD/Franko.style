import api from "./api";

export default {
  getProduct(params: any) {
    return api().get(`products/${params.id}`, { params });
  },
  getProducts(params: any) {
    return api().get(`products`, { params });
  },
  getProductsByCategory(params: any) {
    return api().get(`products/category/${params.id}`, { params });
  },
  getLovedProducts(params: any) {
    return api().get(`products/loved`, { params });
  },
  getCartProducts(params: any) {
    return api().get(`products/cart`, { params });
  },
  putLovedProduct(params: any) {
    return api().put(`products/${params.id}/loved`, params);
  },
  postCartProduct(params: any) {
    return api().post(`products/${params.id}/cart`, params);
  },
  putCartProductCount(params: any) {
    return api().put(`products/cart/${params.id}/count`, params);
  },
  deleteCartProduct(params: any) {
    return api().delete(`products/cart/${params.id}`, params);
  },
};
