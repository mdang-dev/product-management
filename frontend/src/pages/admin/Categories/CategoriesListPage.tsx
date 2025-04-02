import { useCallback, useMemo, useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import UpdateCategoryModal from "./UpdateCategoryModal";
import { Category } from "../../../models/category.model";
import "../../../styles/CategoriesListPage.scss";
import {
  useFetchCategories,
  useRemoveCategory,
  useUpdateCategory,
} from "../../../hooks/useCategoriesQuery";
import { useModal } from "../../../hooks/useModal";
import { toast } from "react-toastify";

const CategoriesListPage = () => {
  const { data: categories = [] } = useFetchCategories();
  const update = useUpdateCategory();
  const remove = useRemoveCategory();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  const openModal = useModal((set) => set.openModal);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredCategories = useMemo(
    () =>
      categories.filter((category) =>
        category.name.toLowerCase().includes((searchTerm || "").toLowerCase())
      ),
    [categories, searchTerm]
  );

  const handleDeleteClick = useCallback((category: Category) => {
    if (category) {
      openModal(
        "Confirm Deletion",
        "Are you sure you want to delete this item?",
        "delete",
        () =>
          remove.mutate(category.id, {
            onSuccess: () => {
              toast.success("Category deleted successfully");
            },
            onError: () => {
              toast.error("Failed to delete category");
            },
          })
      );
    }
  }, []);

  const handleUpdateCategory = (updatedCategory: Category) => {
    update.mutate(updatedCategory, {
      onSuccess: () => {
        toast.success("Category updated successfully");
      },
      onError: () => {
        toast.error("Failed to update category");
      },
    });
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
              onClick={() => {
                setSelectedCategory(row.original);
              }}
              className="update-btn"
            >
              Edit
            </button>
            <button
              onClick={() => {
                handleDeleteClick(row.original);
              }}
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
    data: filteredCategories,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="categories-list-container">
      <h2>Categories</h2>
      <div className="search-bar">
        <label htmlFor="search-input" className="search-label">
          Search:
        </label>
        <input
          id="search-input"
          type="text"
          placeholder="Search categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      <table
        className="categories-table"
        style={{ borderRadius: "8px", fontFamily: "Arial, sans-serif" }}
      >
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
      {selectedCategory && (
        <UpdateCategoryModal
          category={selectedCategory}
          onClose={() => {
            setSelectedCategory(null);
          }}
          onUpdate={handleUpdateCategory}
        />
      )}
    </div>
  );
};

export default CategoriesListPage;
