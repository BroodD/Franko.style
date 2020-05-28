import { combineReducers } from "./combineReducers";
import { sessionsReducer } from "./sessions/sessions.reducer";
import { userReducer } from "./user/user.reducer";

export const initialState: AppState = {
  data: {
    loved: [],
    cart: [],
    products: [],
    productsPage: 1,
    error: "",
    categories: [],
    loading: false,
  },
  user: {
    hasSeenTutorial: false,
    isLoggedin: false,
    loading: false,
    lang: "uk",
  },
};

export const reducers = combineReducers({
  data: sessionsReducer,
  user: userReducer,
});

export type AppState = ReturnType<typeof reducers>;
