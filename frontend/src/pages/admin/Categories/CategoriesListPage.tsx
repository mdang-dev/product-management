import React, { useMemo, useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import UpdateCategoryModal from "./UpdateCategoryModal";
import { toast, ToastContainer } from "react-toastify";
import {
  useCategoriesQuery,
  useCategoriesStore,
} from "../../../store/categoriesStore";
import { Category } from "../../../models/category.model";
import "../../../styles/CategoriesListPage.scss";
import { useCategories } from "../../../hooks/useCategories";

const CategoriesListPage = () => {
  const {
    selectedCategory,
    isUpdateModalOpen,
    isDeleteModalOpen,
    setSelectedCategory,
    setUpdateModalOpen,
    setDeleteModalOpen,
  } = useCategoriesStore();


  const { data: categories = [], update, remove } = useCategories();

  const [searchTerm, setSearchTerm] = useState("");

  const filteredCategories = useMemo(
    () =>
      categories.filter((category) =>
        category.name.toLowerCase().includes((searchTerm || "").toLowerCase())
      ),
    [categories, searchTerm]
  );

  const confirmDelete = async () => {
    if (selectedCategory) {
      try {
        await remove.mutate(selectedCategory.id);
        toast.success("Category deleted successfully!");
        setDeleteModalOpen(false);
        setSelectedCategory(null);
      } catch {
        toast.error("Failed to delete category.");
      }
    }
  };

  const handleUpdateCategory = async (updatedCategory: Category) => {
    try {
      await update.mutate(updatedCategory);
      toast.success("Category updated successfully!");
      setUpdateModalOpen(false);
      setSelectedCategory(null);
    } catch {
      toast.error("Failed to update category.");
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
              onClick={() => {
                setSelectedCategory(row.original);
                setDeleteModalOpen(true);
              }}
              className="update-btn"
            >
              Edit
            </button>
            <button
              onClick={() => {
                setSelectedCategory(row.original);
                setDeleteModalOpen(true);
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
      {isUpdateModalOpen && selectedCategory && (
        <UpdateCategoryModal
          category={selectedCategory}
          onClose={() => {
            setUpdateModalOpen(false);
            setSelectedCategory(null);
          }}
          onUpdate={handleUpdateCategory}
        />
      )}
      {isDeleteModalOpen && selectedCategory && (
        <ConfirmDeleteModal
          categoryName={selectedCategory.name}
          onClose={() => {
            setDeleteModalOpen(false);
            setSelectedCategory(null);
          }}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
};

export default CategoriesListPage;
