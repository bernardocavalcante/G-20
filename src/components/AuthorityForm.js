import React, { useContext, useState } from "react";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";

const ROLES = [
  "Chefe de Estado",
  "Ministro de Finança",
  "Presidente de Banco Central",
];

export default function AuthorityForm({ country }) {
  const { authorities, setAuthorities } = useContext(AppContext);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const tld = country.tld && country.tld[0]; // ex: ".br"

  // Validate unique role per country
  const roleTaken = authorities.some(
    (a) => a.country.cca3 === country.cca3 && a.role === role
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !role || !email) return alert("Preencha todos os campos");
    if (roleTaken)
      return alert("Esse cargo já possui autoridade registrada nesse país.");
    if (!email.endsWith(tld))
      return alert("Email inválido para o TLD do país selecionado.");

    const newAuth = {
      country,
      name,
      role,
      email,
    };
    setAuthorities([...authorities, newAuth]);
    navigate(`/countries/${country.cca3}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Nome da Autoridade (Full Name):</label>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <label>Cargo/Função:</label>
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="">Selecione...</option>
        {ROLES.map((r) => (
          <option key={r} value={r}>
            {r}
          </option>
        ))}
      </select>
      <label>Email ({tld}):</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">Cadastrar</button>
    </form>
  );
}
