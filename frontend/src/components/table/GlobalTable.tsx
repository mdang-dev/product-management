import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import "../../styles/ProductListPage.scss";
import { ArrowUpDown } from "lucide-react";

type GobalTableProps<T> =  {
  data: T[];
  columns: ColumnDef<T, any>[];
  loading?: boolean;
  pagination?: number;
  handleUpdateClick?: (item: T) => void;
  handleDeleteClick?: (item: T) => void;
}

export function GlobalTable<T>({
  data,
  columns,
  loading,
  pagination,
  handleUpdateClick,
  handleDeleteClick,
}: GobalTableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const {
    getHeaderGroups,
    getRowModel,
    setPageIndex,
    setPageSize,
    getPageCount,
    getCanNextPage,
    getCanPreviousPage,
    nextPage,
    previousPage,
  } = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    pageCount: Math.ceil(data.length / pagination! || 10),
    manualPagination: false,
  });

  return (
    <div className="table-wrapper">
      <table className="product-table">
        <thead>
          {getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  <div
                    className={
                      header.column.getCanSort() ? "column-header" : ""
                    }
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {header.column.getCanSort() && (
                      <ArrowUpDown size={20} color="white" />
                    )}
                  </div>
                </th>
              ))}
              <th>Actions</th>
            </tr>
          ))}
        </thead>
        <tbody>
          {getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
              <td>
                <div className="actions">
                  <button
                    className="edit-btn"
                    onClick={() => handleUpdateClick!(row.original)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteClick!(row.original)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
