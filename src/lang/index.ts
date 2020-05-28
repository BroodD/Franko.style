import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import uk from "./uk.json";
import ru from "./ru.json";

const resources = {
  uk: {
    translation: uk,
  },
  ru: {
    translation: ru,
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
