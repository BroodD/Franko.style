import { SessionsActions } from "./sessions.actions";
import { ConfState } from "./conf.state";

export const sessionsReducer = (
  state: ConfState,
  action: SessionsActions
): ConfState => {
  switch (action.type) {
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
      return { ...state, cart: action.data };
    }
    case "add-or-remove-loved": {
      return (
        action.data &&
        (action.data.action
          ? {
              ...state,
              loved: [action.data.product, ...state.loved],
              products: state.products.map((p) => {
                return p.id === action.id ? { ...p, loved: true } : p;
              }),
            }
          : {
              ...state,
              loved: state.loved.filter((x) => x.id !== action.id),
              products: state.products.map((p) => {
                return p.id === action.id ? { ...p, loved: false } : p;
              }),
            })
      );
    }
    case "add-cart": {
      return {
        ...state,
        cart: [
          { ...action.data.cartProduct, product: action.data.product },
          ...state.cart,
        ],
      };
    }
    case "update-count-cart": {
      return {
        ...state,
        cart: state.cart.map((c) => {
          return c.id === action.id ? { ...c, count: action.data.count } : c;
        }),
      };
    }
    case "remove-cart": {
      return {
        ...state,
        cart: state.cart.filter((c) => c.id !== action.id),
      };
    }
    case "set-error": {
      const error = action.error;
      const msg = error.response ? error.response.data.error : error;
      return { ...state, error: msg };
    }
  }
};
