import React, { useState, useMemo, useCallback } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import { useProductsQuery, useProductStore } from "../../../store/productStore";
import { toast } from "react-toastify";
import "../../../styles/ProductListPage.scss";
import { Product } from "../../../models/product.model";
import UpdateProductModal from "./UpdateProductModal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import { useProducts } from "../../../hooks/useProducts";

const ProductListPage = () => {
  const { updateProduct, removeProduct } = useProductsQuery();
  const { data: products = [] } = useProducts();
  const {
    setSelectedProduct,
    setUpdateModalOpen,
    setDeleteModalOpen,
    selectedProduct,
    isUpdateModalOpen,
    isDeleteModalOpen,
  } = useProductStore();

  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = useMemo(
    () =>
      products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [products, searchTerm]
  );

  const handleUpdateClick = useCallback((product: Product) => {
    setSelectedProduct(product);
    setUpdateModalOpen(true);
  }, []);

  const handleDeleteClick = useCallback((product: Product) => {
    setSelectedProduct(product);
    setDeleteModalOpen(true);
  }, []);

  const handleCloseUpdateModal = () => {
    setUpdateModalOpen(false);
    setSelectedProduct(null);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedProduct(null);
  };

  const confirmDelete = async () => {
    try {
      if (selectedProduct) {
        await removeProduct.mutateAsync(selectedProduct.id);
        toast.success("Product deleted successfully!");
      }
      handleCloseDeleteModal();
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product.");
    }
  };

  const handleUpdateSubmit = async (data: Product) => {
    try {
      if (selectedProduct) {
        await updateProduct.mutateAsync({
          ...selectedProduct,
          ...data,
        });
        toast.success("Product updated successfully!");
      }
      handleCloseUpdateModal();
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product.");
    }
  };

  const columns = useMemo<ColumnDef<Product>[]>(
    () => [
      { accessorKey: "id", header: "Product ID" },
      { accessorKey: "name", header: "Product Name" },
      { accessorKey: "description", header: "Description" },
      {
        accessorKey: "imageUrl",
        header: "Image",
        cell: ({ row }) => (
          <div className="image-preview-cell">
            <img
              src={
                `${process.env.url}/${row.original.imageUrl}` ||
                "/placeholder-image.png"
              }
              alt={row.original.name}
              className="table-image-preview"
            />
          </div>
        ),
      },
      { accessorKey: "quantity", header: "Quantity" },
      {
        accessorKey: "price",
        header: "Price",
        cell: (info) => `$${info.getValue()}`,
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="actions">
            <button
              className="edit-btn"
              onClick={() => handleUpdateClick(row.original)}
            >
              Edit
            </button>
            <button
              className="delete-btn"
              onClick={() => handleDeleteClick(row.original)}
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
    data: filteredProducts,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="product-table-container">
      <h2>Product List</h2>
      <div className="search-bar">
        <label htmlFor="search-input" className="search-label">
          Search:
        </label>
        <input
          id="search-input"
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      <table className="product-table">
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

      <UpdateProductModal
        isOpen={isUpdateModalOpen}
        onClose={handleCloseUpdateModal}
        onSubmit={handleUpdateSubmit}
        initialData={selectedProduct}
      />

      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default ProductListPage;
