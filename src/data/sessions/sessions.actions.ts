import {
  loadLovedProductsData,
  putLovedProduct,
  postCartProduct,
  loadProductsData,
  loadCartProductsData,
  loadCategoriesData,
  putCartProductCount,
  deleteCartProduct,
} from "../dataApi";
import { ActionType } from "../../util/types";
import { ConfState } from "./conf.state";

export const loadConfData = () => async (dispatch: React.Dispatch<any>) => {};

export const loadProducts = (page: number = 1, clear?: boolean) => async (
  dispatch: React.Dispatch<any>
) => {
  try {
    const data = await loadProductsData(page);
    if (data && data.length) await dispatch(setProductsPage(page + 1));
    return {
      type: "set-products-data",
      data,
      page,
      clear,
    } as const;
  } catch (error) {
    return {
      type: "set-error",
      error,
    } as const;
  }
};

export const setProductsPage = (page: number) =>
  ({
    type: "set-products-page",
    page,
  } as const);

export const loadCategories = () => async () => {
  try {
    const data = await loadCategoriesData();
    return {
      type: "set-categories-data",
      data,
    } as const;
  } catch (error) {
    return {
      type: "set-error",
      error,
    } as const;
  }
};

export const loadLovedProducts = (
  offset: number = 1,
  clear?: boolean
) => async (dispatch: React.Dispatch<any>) => {
  try {
    let data;
    if (clear) {
      data = [];
    } else {
      data = await loadLovedProductsData(offset);
    }
    return {
      type: "set-loved-data",
      data,
      offset,
      clear,
    } as const;
  } catch (error) {
    return {
      type: "set-error",
      error,
    } as const;
  }
};

export const loadCartProducts = (clear?: boolean) => async () => {
  try {
    let data;
    if (clear) {
      data = [];
    } else {
      data = await loadCartProductsData();
    }
    return {
      type: "set-cart-data",
      data,
      clear,
    } as const;
  } catch (error) {
    return {
      type: "set-error",
      error,
    } as const;
  }
};

export const addOrRemoveLoved = (id: number) => async () => {
  try {
    const data = await putLovedProduct(id);
    return {
      type: "add-or-remove-loved",
      id,
      data,
    } as const;
  } catch (error) {
    return {
      type: "set-error",
      error,
    } as const;
  }
};

export const addToCart = (id: number, size: string) => async (
  dispatch: React.Dispatch<any>
) => {
  try {
    const data = await postCartProduct(id, size);
    dispatch(setError("product_added_to_cart"));
    return {
      type: "add-cart",
      id,
      data,
    } as const;
  } catch (error) {
    return {
      type: "set-error",
      error,
    } as const;
  }
};

export const updateCountCart = (id: number, count: number) => async () => {
  try {
    const data = await putCartProductCount(id, count);
    return {
      type: "update-count-cart",
      id,
      data,
    } as const;
  } catch (error) {
    return {
      type: "set-error",
      error,
    } as const;
  }
};

export const removeCart = (id: number) => async () => {
  try {
    const data = await deleteCartProduct(id);
    return {
      type: "remove-cart",
      id,
      data,
    } as const;
  } catch (error) {
    return {
      type: "set-error",
      error,
    } as const;
  }
};

export const setError = (error: string) =>
  ({
    type: "set-error",
    error,
  } as const);

export const setLoading = (isLoading: boolean) =>
  ({
    type: "set-conf-loading",
    isLoading,
  } as const);

export const setData = (data: Partial<ConfState>) =>
  ({
    type: "set-conf-data",
    data,
  } as const);

export const addFavorite = (sessionId: number) =>
  ({
    type: "add-favorite",
    sessionId,
  } as const);

export const removeFavorite = (sessionId: number) =>
  ({
    type: "remove-favorite",
    sessionId,
  } as const);

export const updateFilteredTracks = (filteredTracks: string[]) =>
  ({
    type: "update-filtered-tracks",
    filteredTracks,
  } as const);

export const setSearchText = (searchText?: string) =>
  ({
    type: "set-search-text",
    searchText,
  } as const);

export type SessionsActions =
  | ActionType<typeof setLoading>
  | ActionType<typeof setData>
  | ActionType<typeof loadProducts>
  | ActionType<typeof setProductsPage>
  | ActionType<typeof loadCategories>
  | ActionType<typeof loadLovedProducts>
  | ActionType<typeof loadCartProducts>
  | ActionType<typeof addOrRemoveLoved>
  | ActionType<typeof addToCart>
  | ActionType<typeof updateCountCart>
  | ActionType<typeof removeCart>
  | ActionType<typeof setError>
  | ActionType<typeof addFavorite>
  | ActionType<typeof removeFavorite>
  | ActionType<typeof updateFilteredTracks>
  | ActionType<typeof setSearchText>;
