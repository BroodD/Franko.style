export interface UserState {
  isLoggedin: boolean;
  hasSeenTutorial: boolean;
  loading: boolean;
  lang: string;
  token?: string;
}
