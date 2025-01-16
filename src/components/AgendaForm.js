import React, { useContext, useState } from "react";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import { isTimeSlotAvailable } from "../utils/dateUtils";

// Supondo que já existam autoridades registradas
export default function AgendaForm() {
  const { agendas, setAgendas, authorities } = useContext(AppContext);
  const [selectedAuthority, setSelectedAuthority] = useState("");
  const [datetime, setDatetime] = useState("");
  const navigate = useNavigate();

  // Datas permitidas: 18 e 19 de novembro de 2025
  // Vamos validar isso antes de enviar.

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedAuthority || !datetime)
      return alert("Preencha todos os campos");
    const dateObj = new Date(datetime);
    if (
      dateObj.getFullYear() !== 2025 ||
      dateObj.getMonth() !== 10 /* zero-based, 10 = novembro */ ||
      (dateObj.getDate() !== 18 && dateObj.getDate() !== 19)
    ) {
      return alert("Data inválida! Somente 18 ou 19 de novembro de 2025.");
    }

    // Validar conflito de agenda (15 minutos)
    if (!isTimeSlotAvailable(agendas, dateObj)) {
      return alert("Conflito de horário! Selecione outro horário.");
    }

    const authorityObj = authorities.find(
      (a) =>
        a.country.name.common + "/" + a.name + "/" + a.role ===
        selectedAuthority
    );
    setAgendas([...agendas, { authority: authorityObj, datetime: dateObj }]);
    navigate("/agendas");
  };

  const formattedAuthorities = authorities.map((a) => {
    const label = a.country.cca3 + "/" + a.name + "/" + a.role;
    return label;
  });

  return (
    <form onSubmit={handleSubmit}>
      <label>Autoridade:</label>
      <select
        value={selectedAuthority}
        onChange={(e) => setSelectedAuthority(e.target.value)}
      >
        <option value="">Selecione...</option>
        {formattedAuthorities.map((auth, i) => (
          <option key={i} value={auth}>
            {auth}
          </option>
        ))}
      </select>
      <label>Data e hora:</label>
      <input
        type="datetime-local"
        value={datetime}
        onChange={(e) => setDatetime(e.target.value)}
      />
      <button type="submit">Agendar</button>
    </form>
  );
}
