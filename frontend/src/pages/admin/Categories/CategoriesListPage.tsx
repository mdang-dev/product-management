import React, { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import "../../../styles/CategoriesListPage.scss";
import { Category } from "../../../model/category.model";

const initialData: Category[] = [
  { id: "1", name: "Electronics" },
  { id: "2", name: "Clothing" },
  { id: "3", name: "Books" },
];

const CategoriesListPage = () => {
  const [data, setData] = useState<Category[]>(initialData);

  const handleDelete = (id: string) => {
    setData((prev) => prev.filter((category) => category.id !== id));
  };

  const handleUpdate = (id: string) => {
    const newName = prompt("Enter new category name:");
    if (newName) {
      setData((prev) =>
        prev.map((category) =>
          category.id === id ? { ...category, name: newName } : category
        )
      );
    }
  };

  const columns = useMemo<ColumnDef<Category>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
      },
      {
        accessorKey: "name",
        header: "Category Name",
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="action-buttons">
            <button
              onClick={() => handleUpdate(row.original.id)}
              className="update-btn"
            >
              Update
            </button>
            <button
              onClick={() => handleDelete(row.original.id)}
              className="delete-btn"
            >
              Delete
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="categories-list-container">
      <h2>Categories</h2>
      <table className="categories-table">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoriesListPage;
