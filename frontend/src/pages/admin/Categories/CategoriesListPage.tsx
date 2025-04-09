import { useCallback, useEffect, useMemo, useState } from "react";
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
import { GlobalTable } from "../../../components/table/GlobalTable";

const CategoriesListPage = () => {
  const { data: categories = [] } = useFetchCategories();
  const update = useUpdateCategory();
  const remove = useRemoveCategory();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 10000);
  }, []);

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

  const handleUpdateCategory = useCallback((updatedCategory: Category) => {
    update.mutate(updatedCategory, {
      onSuccess: () => {
        toast.success("Category updated successfully");
      },
      onError: () => {
        toast.error("Failed to update category");
      },
    });
  }, []);

  const columns = useMemo<ColumnDef<Category>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        enableSorting: false,
      },
      {
        accessorKey: "name",
        header: "Category Name",
        sortingFn: "alphanumeric",
      },
    ],
    []
  );

  return (
    <div className="categories-list-container">
      <h2>Categories</h2>
      {/* <div className="search-bar">
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
      </div> */}
      <GlobalTable
        data={filteredCategories}
        columns={columns}
        loading={isLoading}
        handleDeleteClick={handleDeleteClick}
        handleUpdateClick={setSelectedCategory}
      />
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
