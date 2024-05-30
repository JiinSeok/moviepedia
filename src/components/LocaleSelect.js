import { useLocale, useSetLocale } from "../contexts/LocaleContext";

function LocaleSelect() {
  const locale = useLocale(); // prop 대신 useContext Custom Hook
  const setLocale = useSetLocale();

  const handleChange = (e) => setLocale(e.target.value);

  return (
    <select value={locale} onChange={handleChange}>
      <option value={'ko'}>한국어</option>
      <option value={'en'}>English</option>
    </select>
  );
}

export default LocaleSelect;