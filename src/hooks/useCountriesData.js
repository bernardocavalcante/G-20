import { getCache, setCache } from "../utils/localStorageCache";

function filterG20(data, G20List) {
  return data.filter((c) => G20List.includes(c.name.common));
}

export async function getCountriesData(G20List) {
  const cached = getCache("g20countries");
  if (cached) return cached;

  const res = await fetch("https://restcountries.com/v3.1/all");
  const allCountries = await res.json();
  const g20Countries = filterG20(allCountries, G20List);

  setCache("g20countries", g20Countries);
  return g20Countries;
}
