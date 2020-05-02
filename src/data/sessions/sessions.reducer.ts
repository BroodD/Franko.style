import { SessionsActions } from "./sessions.actions";
import { ConfState } from "./conf.state";

export const sessionsReducer = (
  state: ConfState,
  action: SessionsActions
): ConfState => {
  switch (action.type) {
    case "set-conf-loading": {
      return { ...state, loading: action.isLoading };
    }
    case "set-conf-data": {
      return { ...state, ...action.data };
    }
    case "set-products-page": {
      return { ...state, productsPage: action.page };
    }
    case "set-products-data": {
      return action.clear
        ? { ...state, products: action.data }
        : { ...state, products: state.products.concat(action.data) };
    }
    case "set-loved-data": {
      return action.clear
        ? { ...state, loved: action.data }
        : { ...state, loved: state.loved.concat(action.data) };
    }
    case "add-or-remove-loved": {
      return action.data.action
        ? {
            ...state,
            loved: [...state.loved, action.data.product],
            products: state.products.map((p) => {
              return p.id == action.id ? { ...p, loved: true } : p;
            }),
          }
        : {
            ...state,
            loved: state.loved.filter((x) => x.id !== action.id),
            products: state.products.map((p) => {
              return p.id == action.id ? { ...p, loved: false } : p;
            }),
          };
    }
    case "set-loved-page": {
      return { ...state, lovedPage: action.page };
    }
    case "add-favorite": {
      return { ...state, favorites: [...state.favorites, action.sessionId] };
    }
    case "remove-favorite": {
      return {
        ...state,
        favorites: [...state.favorites.filter((x) => x !== action.sessionId)],
      };
    }
    case "update-filtered-tracks": {
      return { ...state, filteredTracks: action.filteredTracks };
    }
    case "set-search-text": {
      return { ...state, searchText: action.searchText };
    }
  }
};
