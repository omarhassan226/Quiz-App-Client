// useTranslation.ts
import { useTranslation } from "react-i18next";

export const useTranslationHelper = () => {
    const { t, i18n } = useTranslation();
    const arabic = i18n.language === "ar";

    return {
        translate: t,
        isArabic: arabic
    };
};
