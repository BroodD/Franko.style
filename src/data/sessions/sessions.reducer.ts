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
    case "set-categories-data": {
      return { ...state, categories: action.data };
    }
    case "set-products-data": {
      return action.clear || action.page === 1
        ? { ...state, products: action.data }
        : { ...state, products: state.products.concat(action.data) };
    }
    case "set-loved-data": {
      return action.clear || action.offset === 0
        ? { ...state, loved: action.data }
        : { ...state, loved: state.loved.concat(action.data) };
    }
    case "set-cart-data": {
      return action.clear || action.offset === 0
        ? { ...state, cart: action.data }
        : { ...state, cart: state.cart.concat(action.data) };
    }
    case "add-or-remove-loved": {
      return (
        action.data &&
        (action.data.action
          ? {
              ...state,
              loved: [action.data.product, ...state.loved],
              // products: state.products.map((p) => {
              //   return p.id === action.id ? { ...p, loved: true } : p;
              // }),
            }
          : {
              ...state,
              loved: state.loved.filter((x) => x.id !== action.id),
              // products: state.products.map((p) => {
              //   return p.id === action.id ? { ...p, loved: false } : p;
              // }),
            })
      );
    }
    case "add-or-remove-cart": {
      return action.data.action
        ? {
            ...state,
            cart: [action.data.product, ...state.cart],
          }
        : {
            ...state,
            cart: state.cart.filter((x) => x.id !== action.id),
          };
    }
    case "set-error": {
      const error = action.error;
      const msg = error.response ? error.response.data.error : error;
      console.log("--- msg", msg);
      return { ...state, error: msg };
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
