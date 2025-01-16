import React, { useContext } from "react";
import { AppContext } from "../App";
import RegionFilter from "./RegionFilter";
import NameFilter from "./NameFilter";
import { NavLink, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const { loading, filteredCountries, selectedCountry, setSelectedCountry } =
    useContext(AppContext);
  const navigate = useNavigate();

  const handleSelectCountry = (c) => {
    setSelectedCountry(c);
    navigate(`/countries/${c.cca3}`);
  };

  return (
    <div className="sidebar">
      <h2>G20 Countries</h2>
      <RegionFilter />
      <NameFilter />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {filteredCountries.map((country) => (
            <li
              key={country.cca3}
              className={
                selectedCountry && selectedCountry.cca3 === country.cca3
                  ? "selected"
                  : ""
              }
              onClick={() => handleSelectCountry(country)}
            >
              {country.name.common}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
