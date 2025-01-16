import React, { useContext } from "react";
import { AppContext } from "../App";

export default function AuthorityList({ country }) {
  const { authorities } = useContext(AppContext);
  const auths = authorities.filter((a) => a.country.cca3 === country.cca3);

  return (
    <ul>
      {auths.map((a, i) => (
        <li key={i}>
          {a.name} - {a.role} - {a.email}
        </li>
      ))}
    </ul>
  );
}
