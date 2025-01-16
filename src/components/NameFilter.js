import React, { useContext } from "react";
import { AppContext } from "../App";

export default function NameFilter() {
  const { nameFilter, setNameFilter } = useContext(AppContext);

  return (
    <div className="name-filter">
      <input
        type="text"
        placeholder="Filter by name..."
        value={nameFilter}
        onChange={(e) => setNameFilter(e.target.value)}
      />
    </div>
  );
}
