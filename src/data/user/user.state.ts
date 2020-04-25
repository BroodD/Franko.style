export interface UserState {
  isLoggedin: boolean;
  hasSeenTutorial: boolean;
  loading: boolean;
  username?: string;
  token?: string;
}
