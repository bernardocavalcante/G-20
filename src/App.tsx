import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { getCountriesData } from "./hooks/useCountriesData";
import { G20_COUNTRIES_PT_EN } from "./constants";
import Sidebar from "./components/Sidebar";
import "./app.css";

export const AppContext = React.createContext();

function App() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [regionFilters, setRegionFilters] = useState([]);
  const [nameFilter, setNameFilter] = useState("");
  const [authorities, setAuthorities] = useState([]);
  const [agendas, setAgendas] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await getCountriesData(G20_COUNTRIES_PT_EN);
      setCountries(data);
      setLoading(false);
    })();
  }, []);

  const filteredCountries = countries
    .filter((country) => {
      if (regionFilters.length > 0 && !regionFilters.includes(country.region))
        return false;
      if (
        nameFilter &&
        !country.name.common.toLowerCase().includes(nameFilter.toLowerCase())
      )
        return false;
      return true;
    })
    .sort((a, b) => a.name.common.localeCompare(b.name.common));

  return (
    <AppContext.Provider
      value={{
        countries,
        loading,
        selectedCountry,
        setSelectedCountry,
        filteredCountries,
        regionFilters,
        setRegionFilters,
        nameFilter,
        setNameFilter,
        authorities,
        setAuthorities,
        agendas,
        setAgendas,
      }}
    >
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Outlet />
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
