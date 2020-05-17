import {
  getUserData,
  setIsLoggedInData,
  setUserProfileData,
  setHasSeenTutorialData,
  setLangData,
} from "../dataApi";
import { ActionType } from "../../util/types";
import { UserState } from "./user.state";
import axios from "axios";

export const loadUserData = () => async (dispatch: React.Dispatch<any>) => {
  dispatch(setLoading(true));
  const data = await getUserData();
  axios.defaults.headers.common["authorization"] = data.token;
  dispatch(setData(data));
  dispatch(setLoading(false));
};

export const setLoading = (isLoading: boolean) =>
  ({
    type: "set-user-loading",
    isLoading,
  } as const);

export const setData = (data: Partial<UserState>) =>
  ({
    type: "set-user-data",
    data,
  } as const);

export const logoutUser = () => async (dispatch: React.Dispatch<any>) => {
  await setIsLoggedInData(false);
};

export const setIsLoggedIn = (loggedIn: boolean) => async () => {
  await setIsLoggedInData(loggedIn);
  return {
    type: "set-is-loggedin",
    loggedIn,
  } as const;
};

export const setUserProfile = (data: Partial<UserState>) => async (
  dispatch: React.Dispatch<any>
) => {
  await setUserProfileData(data);
  // dispatch(loadUserData);
  axios.defaults.headers.common["authorization"] = data.token;
  return {
    type: "set-user-data",
    data,
  } as const;
};

export const setHasSeenTutorial = (hasSeenTutorial: boolean) => async () => {
  await setHasSeenTutorialData(hasSeenTutorial);
  return {
    type: "set-has-seen-tutorial",
    hasSeenTutorial,
  } as const;
};

export const setLang = (lang: string) => async () => {
  await setLangData(lang);
  return {
    type: "set-lang",
    lang,
  } as const;
};

export type UserActions =
  | ActionType<typeof setLoading>
  | ActionType<typeof setData>
  | ActionType<typeof setIsLoggedIn>
  | ActionType<typeof setHasSeenTutorial>
  | ActionType<typeof setLang>;
