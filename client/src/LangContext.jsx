import { createContext, useContext } from 'react';

export const LangContext = createContext('he');
export const useLang = () => useContext(LangContext);

export const t = (obj, field) => {
  // useLang() can't be called here so we pass lang explicitly
  return obj;
};

// Pick the right field based on language
export const pick = (obj, field, lang) =>
  lang === 'ar' ? (obj[`${field}Ar`] ?? obj[field]) : obj[field];
