import React from "react";

export default function CountryDetail({ country }) {
  const { name, capital, region, languages, tld } = country;
  const firstLang = languages ? Object.values(languages)[0] : "";
  return (
    <div className="country-detail">
      <h2>{name.common}</h2>
      <p>
        <strong>Capital:</strong> {capital && capital[0]}
      </p>
      <p>
        <strong>Region:</strong> {region}
      </p>
      <p>
        <strong>Language:</strong> {firstLang}
      </p>
      <p>
        <strong>TLD:</strong> {tld && tld[0]}
      </p>
    </div>
  );
}
