import { ColumnFiltersState } from "@tanstack/react-table";
import React from "react";

type FiltersProps = {
  columnFilters: ColumnFiltersState;
  setColumnFilters: React.Dispatch<React.SetStateAction<ColumnFiltersState>>;
  filterKey: string;
};

export default function Filters({
  columnFilters,
  setColumnFilters,
  filterKey,
}: FiltersProps) {
  const valueFilter =
    columnFilters.find((f) => f.id === filterKey)?.value || "";

  const onFilterChange = (id: string, value: string) => {
    setColumnFilters((prev) =>
      prev
        .filter((f) => f.id !== id)
        .concat({
          id,
          value,
        })
    );
  };

  return (
    <div className="search-bar">
      <label htmlFor="search-input" className="search-label">
        Search:
      </label>
      <input
        id="search-input"
        type="text"
        placeholder="Search products..."
        value={valueFilter as string}
        onChange={(e) => onFilterChange(filterKey, e.target.value)}
        className="search-input"
      />
    </div>
  );
}
