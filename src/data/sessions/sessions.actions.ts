import {
  getConfData,
  loadLovedProductsData,
  putLovedProduct,
  loadProductsData,
} from "../dataApi";
import { ActionType } from "../../util/types";
import { ConfState } from "./conf.state";

export const loadConfData = () => async (dispatch: React.Dispatch<any>) => {
  dispatch(setLoading(true));
  const data = await getConfData();
  dispatch(setData(data));
  dispatch(setLoading(false));
};

export const loadProducts = (page: number = 1, clear?: boolean) => async (
  dispatch: React.Dispatch<any>
) => {
  const data = await loadProductsData(page);
  if (data && data.length) await dispatch(setProductsPage(page + 1));
  return {
    type: "set-products-data",
    data,
    clear,
  } as const;
};

export const setProductsPage = (page: number) =>
  ({
    type: "set-products-page",
    page,
  } as const);

export const loadLovedProducts = (page: number = 1, clear?: boolean) => async (
  dispatch: React.Dispatch<any>
) => {
  const data = await loadLovedProductsData(page);
  if (data && data.length) await dispatch(setLovedPage(page + 1));
  return {
    type: "set-loved-data",
    data,
    clear,
  } as const;
};

export const addOrRemoveLoved = (id: number) => async () => {
  const data = await putLovedProduct(id);
  console.log("--- data add or", data);
  return {
    type: "add-or-remove-loved",
    id,
    data,
  } as const;
};

export const setLovedPage = (page: number) =>
  ({
    type: "set-loved-page",
    page,
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
  | ActionType<typeof loadLovedProducts>
  | ActionType<typeof addOrRemoveLoved>
  | ActionType<typeof setLovedPage>
  | ActionType<typeof addFavorite>
  | ActionType<typeof removeFavorite>
  | ActionType<typeof updateFilteredTracks>
  | ActionType<typeof setSearchText>;
