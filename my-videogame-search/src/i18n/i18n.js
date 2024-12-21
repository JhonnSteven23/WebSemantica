import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translations from "./locales";

i18n.use(initReactI18next).init({
    resources: {
        es: { translation: translations.es },
        en: { translation: translations.en },
        fr: { translation: translations.fr },
    },
    lng: "es", // Idioma inicial
    fallbackLng: "es", // Idioma por defecto si no se encuentra la traducción
    interpolation: { escapeValue: false }, // React ya maneja el escape de valores
});

export default i18n;