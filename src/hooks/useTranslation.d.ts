// src/hooks/useTranslation.d.ts
declare module '../../hooks/useTranslation.jsx' {
    export const useTranslationHelper: () => {
        translate: (key: string) => string;
        isArabic: boolean;
    };
}
