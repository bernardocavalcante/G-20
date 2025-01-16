import React, { useContext } from "react";
import { AppContext } from "../App";

export default function RegionFilter() {
  const { countries, regionFilters, setRegionFilters } = useContext(AppContext);

  const allRegions = [...new Set(countries.map((c) => c.region))]
    .filter(Boolean)
    .sort();

  const handleChange = (region) => {
    // toggle
    if (regionFilters.includes(region)) {
      setRegionFilters(regionFilters.filter((r) => r !== region));
    } else {
      setRegionFilters([...regionFilters, region]);
    }
  };

  return (
    <div className="region-filter">
      <h3>Filter by Region</h3>
      {allRegions.map((region) => (
        <label key={region}>
          <input
            type="checkbox"
            checked={regionFilters.includes(region)}
            onChange={() => handleChange(region)}
          />
          {region}
        </label>
      ))}
    </div>
  );
}
