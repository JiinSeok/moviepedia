import { createContext, useState, useContext } from "react";

const LocaleContext = createContext(); // Context 객체 생성

export function LocaleProvider({ defaultValue='ko', children }) {
  const [locale, setLocale] = useState(defaultValue);
  return (<LocaleContext.Provider value={{
    locale, setLocale,
  }}>{children}</LocaleContext.Provider>); 
} // {children}: LocaleProvider의 자식 컴포넌트

export function useLocale() {
  const context = useContext(LocaleContext); // Context 객체 사용

  if (!context) { // useLocale을 LocaleContext.Provider (LocaleProvider) 밖에서 사용할 경우
    throw new Error('반드시 LocaleProvider 안에서 사용해야 합니다.');
  }

  return context.locale;
}

export function useSetLocale() {
  const context = useContext(LocaleContext); // Context 객체 사용

  if (!context) { // useLocale을 LocaleContext.Provider (LocaleProvider) 밖에서 사용할 경우
    throw new Error('반드시 LocaleProvider 안에서 사용해야 합니다.');
  }

  return context.setLocale;
}