import { Plugins } from "@capacitor/core";
import { Schedule, Session } from "../models/Schedule";
import { Speaker } from "../models/Speaker";
import { Location } from "../models/Location";
import { UserState } from "./user/user.state";
import ProductService from "../services/product";
import CategoryService from "../services/category";

const { Storage } = Plugins;

const dataUrl = "/assets/data/data.json";
const locationsUrl = "/assets/data/locations.json";

const HAS_LOGGED_IN = "hasLoggedIn";
const HAS_SEEN_TUTORIAL = "hasSeenTutorial";
const LANG = "lang";
const USERNAME = "username";
const TOKEN = "token";

export const getConfData = async () => {
  const response = await Promise.all([fetch(dataUrl), fetch(locationsUrl)]);
  const responseData = await response[0].json();
  const schedule = responseData.schedule[0] as Schedule;
  const sessions = parseSessions(schedule);
  const speakers = responseData.speakers as Speaker[];
  const locations = (await response[1].json()) as Location[];
  const allTracks = sessions
    .reduce((all, session) => all.concat(session.tracks), [] as string[])
    .filter((trackName, index, array) => array.indexOf(trackName) === index)
    .sort();

  const data = {
    schedule,
    sessions,
    locations,
    speakers,
    allTracks,
    filteredTracks: [...allTracks],
  };
  return data;
};

export const getUserData = async () => {
  const response = await Promise.all([
    Storage.get({ key: HAS_LOGGED_IN }),
    Storage.get({ key: HAS_SEEN_TUTORIAL }),
    Storage.get({ key: LANG }),
    Storage.get({ key: TOKEN }),
  ]);
  const isLoggedin = (await response[0].value) === "true";
  const hasSeenTutorial = (await response[1].value) === "true";
  const lang = (await response[2].value) || "uk";
  const token = (await response[3].value) || undefined;
  const data = {
    isLoggedin,
    hasSeenTutorial,
    lang,
    token,
  };
  return data;
};

export const setIsLoggedInData = async (isLoggedIn: boolean) => {
  await Storage.set({ key: HAS_LOGGED_IN, value: JSON.stringify(isLoggedIn) });
};

export const setHasSeenTutorialData = async (hasSeenTutorial: boolean) => {
  await Storage.set({
    key: HAS_SEEN_TUTORIAL,
    value: JSON.stringify(hasSeenTutorial),
  });
};

export const setLangData = async (lang: string) => {
  await Storage.set({
    key: LANG,
    value: lang,
  });
};

export const setUserProfileData = async (data: Partial<UserState>) => {
  const { token } = data;
  if (!token) {
    await Storage.remove({ key: TOKEN });
  } else {
    await Storage.set({ key: TOKEN, value: token });
  }
};

export const setUsernameData = async (username?: string) => {
  if (!username) {
    await Storage.remove({ key: USERNAME });
  } else {
    await Storage.set({ key: USERNAME, value: username });
  }
};

export const loadProductsData = async (page: number = 1) => {
  const res = await ProductService.getProducts({ page });
  return res.data.products;
};

export const loadCategoriesData = async () => {
  const res = await CategoryService.getCategories();
  return res.data.categories;
};

export const loadLovedProductsData = async (offset: number = 0) => {
  const res = await ProductService.getLovedProducts({ offset });
  return res.data.products;
};

export const loadCartProductsData = async () => {
  const res = await ProductService.getCartProducts({});
  return res.data.products;
};

export const putLovedProduct = async (id: number) => {
  const res = await ProductService.putLovedProduct({ id });
  return res.data;
};

export const postCartProduct = async (id: number, size: string) => {
  const res = await ProductService.postCartProduct({ id, size });
  return res.data;
};

export const putCartProductCount = async (id: number, count: number) => {
  const res = await ProductService.putCartProductCount({ id, count });
  return res.data;
};

export const deleteCartProduct = async (id: number) => {
  const res = await ProductService.deleteCartProduct({ id });
  return res.data;
};

function parseSessions(schedule: Schedule) {
  const sessions: Session[] = [];
  schedule.groups.forEach((g) => {
    g.sessions.forEach((s) => sessions.push(s));
  });
  return sessions;
}
