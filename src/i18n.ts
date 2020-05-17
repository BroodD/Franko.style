import i18n from "i18next";
import { initReactI18next } from "react-i18next";
// import { Plugins } from "@capacitor/core";
// const { Storage } = Plugins;
// const LANG = "lang";

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  uk: {
    translation: {
      you_are_not_authorized: "Ви не авторизовані",
      account: "Акаунт",
      categories: "Категорії",
    },
  },
  ru: {
    translation: {
      you_are_not_authorized: "Вы не авторизованы",
      account: "Аккаунт",
      categories: "Категории",
    },
  },
};

// const lang = Storage.get({ key: LANG });

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "uk",

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
