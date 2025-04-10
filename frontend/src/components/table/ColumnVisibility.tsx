import React, { useState } from "react";
import { Eye, EyeOff, Funnel } from "lucide-react";
import "../../styles/ColumnVisibilityToggle.scss";
import { Column } from "@tanstack/react-table";

type Props = {
  getAllLeafColumns: () => Column<any, unknown>[];
};

export function ColumnVisibilityToggle({ getAllLeafColumns }: Props) {
  const [open, setOpen] = useState(false);

  const columns = getAllLeafColumns().filter((col) => col.getCanHide());

  return (
    <div className="column-toggle-wrapper">
      <div
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className="toggle-icon"
      >
        <Funnel />
      </div>

      {open && (
        <div
          className="dropdown"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          {columns.map((column) => (
            <label key={column.id} className="checkbox-item">
              <input
                type="checkbox"
                checked={column.getIsVisible()}
                onChange={() => column.toggleVisibility()}
              />
              {column.columnDef.header?.toString()}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
