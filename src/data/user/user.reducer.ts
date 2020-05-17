import { UserActions } from "./user.actions";
import { UserState } from "./user.state";

export function userReducer(state: UserState, action: UserActions): UserState {
  switch (action.type) {
    case "set-user-loading":
      return { ...state, loading: action.isLoading };
    case "set-user-data":
      return { ...state, ...action.data };
    case "set-has-seen-tutorial":
      return { ...state, hasSeenTutorial: action.hasSeenTutorial };
    case "set-lang":
      return { ...state, lang: action.lang };
    case "set-is-loggedin":
      return { ...state, isLoggedin: action.loggedIn };
  }
}
