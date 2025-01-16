import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../App";
import CountryDetail from "../components/CountryDetail";
import AuthorityForm from "../components/AuthorityForm";
import AuthorityList from "../components/AuthorityList";

export default function CountriesPage() {
  const { countries, selectedCountry } = useContext(AppContext);
  const { countryCode } = useParams();

  // Se o país não está no estado selecionado, tenta encontrá-lo
  const country =
    selectedCountry || countries.find((c) => c.cca3 === countryCode);

  return (
    <div>
      {country ? (
        <div>
          <CountryDetail country={country} />
          <h3>Registrar Autoridade</h3>
          <AuthorityForm country={country} />
          <h3>Autoridades</h3>
          <AuthorityList country={country} />
        </div>
      ) : (
        <div>Select a country from the sidebar</div>
      )}
    </div>
  );
}
