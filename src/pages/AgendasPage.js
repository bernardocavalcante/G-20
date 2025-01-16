import React, { useContext } from "react";
import { AppContext } from "../App";
import AgendaForm from "../components/AgendaForm";

export default function AgendasPage() {
  const { agendas } = useContext(AppContext);
  const sortedAgendas = [...agendas].sort(
    (a, b) => new Date(a.datetime) - new Date(b.datetime)
  );

  return (
    <div>
      <h2>Agendas</h2>
      <AgendaForm />
      <ul>
        {sortedAgendas.map((ag, i) => {
          const { authority } = ag;
          return (
            <li key={i}>
              {ag.datetime.toLocaleString()} - {authority.country.name.common} -{" "}
              {authority.name} - {authority.role}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
