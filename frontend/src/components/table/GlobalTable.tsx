import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  GlobalFilterTableState,
  PaginationState,
  Row,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import "../../styles/ProductListPage.scss";
import { ArrowUpDown } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import Filters from "./Filters";
import { ColumnVisibilityToggle } from "./ColumnVisibility";

type GobalTableProps<T> = {
  data: T[];
  columns: ColumnDef<T, any>[];
  loading?: boolean;
  pagination?: number;
  handleUpdateClick?: (item: T) => void;
  handleDeleteClick?: (item: T) => void;
  filterKeys?: string[];
};

export function GlobalTable<T>({
  data,
  columns,
  loading,
  pagination,
  handleUpdateClick,
  handleDeleteClick,
  filterKeys,
}: GobalTableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const finalColumns = [
    ...columns,
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }: { row: Row<T> }) => (
        <div className="actions">
          <button
            className="edit-btn"
            onClick={() => handleUpdateClick?.(row.original)}
          >
            Edit
          </button>
          <button
            className="delete-btn"
            onClick={() => handleDeleteClick?.(row.original)}
          >
            Delete
          </button>
        </div>
      ),
      enableHiding: true,
    },
  ];

  const skeletonRows = Array(5).fill(null);
  const [paginationState, setPaginationState] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });
  const [globalFilter, setGlobalFiter] = useState<string>("");
  const {
    getHeaderGroups,
    getRowModel,
    setPageIndex,
    setPageSize,
    getPageCount,
    getCanNextPage,
    getCanPreviousPage,
    nextPage,
    getState,
    previousPage,
    getAllLeafColumns,
  } = useReactTable({
    data,
    columns: finalColumns,
    state: {
      sorting: sorting,
      columnFilters: columnFilters,
      pagination: paginationState,
      globalFilter: globalFilter,
    },
    onSortingChange: setSorting,
    onPaginationChange: setPaginationState,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    globalFilterFn: "includesString",
    onGlobalFilterChange: setGlobalFiter,
  });

  return (
    <div className="table-wrapper">
      <div style={{ display: "flex", gap: "10px" }}>
        <Filters
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFiter}
          filterKeys={filterKeys}
        />
        <ColumnVisibilityToggle getAllLeafColumns={getAllLeafColumns} />
      </div>
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
                </tr>
              ))}
        </tbody>
      </table>
      <div className="pagination">
        <button
          className="pagination-btn"
          onClick={() => previousPage()}
          disabled={!getCanPreviousPage()}
        >
          Previous
        </button>

        <span className="pagination-info">
          Page {getState().pagination.pageIndex + 1} of {getPageCount()}
        </span>

        <button
          className="pagination-btn"
          onClick={nextPage}
          disabled={!getCanNextPage()}
        >
          Next
        </button>

        <select
          className="pagination-select"
          value={getState().pagination.pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[5, 10, 20].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
