import { createSelector } from "reselect";
import { AppState } from "./state";
import { ICategory } from "../models/Category";

const getCategories = (state: AppState) => state.data.categories;

const getIdParam = (_state: AppState, props: any) => {
  return props.match.params["id"];
};

export const getCategory = createSelector(
  getCategories,
  getIdParam,
  (categories, id) => {
    let cat: ICategory | undefined = categories.find((c) => c.id === +id);
    if (cat) {
      const chidren: ICategory[] = categories.filter((c) => c.parentId === +id);
      cat.children = chidren;
    }
    return cat;
  }
);
