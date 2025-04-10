import { ColumnFiltersState } from "@tanstack/react-table";
import React from "react";
import { Input } from "../ui/Input";
import { Label } from "../ui/index";
import { ColumnVisibilityToggle } from "./ColumnVisibility";

type FiltersProps = {
  columnFilters?: ColumnFiltersState;
  setColumnFilters?: React.Dispatch<React.SetStateAction<ColumnFiltersState>>;
  filterKeys?: string[];
  globalFilter?: string;
  setGlobalFilter?: React.Dispatch<React.SetStateAction<string>>;
};

export default function Filters({
  columnFilters,
  setColumnFilters,
  filterKeys,
  globalFilter,
  setGlobalFilter,
}: FiltersProps) {
  const valueFilter =
    filterKeys && filterKeys.length > 0
      ? columnFilters?.find((f) => f.id === filterKeys[0])?.value
      : globalFilter;

  const onFilterChange = (value: string) => {
    if (filterKeys && filterKeys.length > 0 && setColumnFilters) {
      setColumnFilters!((prev) => {
        const filtered = prev.filter((f) => !filterKeys.includes(f.id));
        const newFilters = filterKeys.map((key) => ({
          id: key,
          value,
        }));
        return [...filtered, ...newFilters];
      });
    } else {
      setGlobalFilter!(value);
    }
  };

  return (
    <div className="search-bar">
      <Label htmlFor="search-input" className="search-label">
        Search:
      </Label>
      <Input
        id="search-input"
        type="text"
        placeholder={`${
          filterKeys && filterKeys.length > 0
            ? `Search by ${filterKeys?.join(", ")}`
            : "Search all..."
        }`}
        value={valueFilter as string}
        onChange={(e) => onFilterChange(e.target.value)}
        className="search-input"
      />

    </div>
  );
}
