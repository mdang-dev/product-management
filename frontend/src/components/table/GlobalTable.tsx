import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  Row,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import "../../styles/ProductListPage.scss";
import { ArrowUpDown } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import Filters from "./Filters";

type GobalTableProps<T> = {
  data: T[];
  columns: ColumnDef<T, any>[];
  loading?: boolean;
  pagination?: number;
  handleUpdateClick?: (item: T) => void;
  handleDeleteClick?: (item: T) => void;
};

export function GlobalTable<T>({
  data,
  columns,
  loading,
  pagination,
  handleUpdateClick,
  handleDeleteClick,
}: GobalTableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const skeletonRows = Array(5).fill(null);

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
    state: { sorting, columnFilters },
    onSortingChange: setSorting,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    pageCount: Math.ceil(data.length / pagination! || 10),
  });

  return (
    <div className="table-wrapper">
      <Filters
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilters}
        keyFilter="name"
      />
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
          {loading
            ? skeletonRows.map((_, index) => (
                <tr key={`skeleton-${index}`}>
                  {columns.map((_, colIndex) => (
                    <td key={`col-${colIndex}`}>
                      <Skeleton height={20} />
                    </td>
                  ))}
                  <td className="actions">
                    <Skeleton width={60} height={30} />
                    <Skeleton width={60} height={30} />
                  </td>
                </tr>
              ))
            : getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
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
