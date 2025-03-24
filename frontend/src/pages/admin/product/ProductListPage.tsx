import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import { useProductsQuery } from "../../../store/productStore";
import { toast } from "react-toastify";
import "../../../styles/ProductListPage.scss";
import { Product } from "../../../model/product.model";
import UpdateProductModal from "./UpdateProductModal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

const ProductTable = () => {
  const { fetchProducts, updateProduct, removeProduct } = useProductsQuery();
  const { data: products = [] } = fetchProducts;
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleUpdateClick = (product: Product) => {
    setSelectedProduct(product);
    setUpdateModalOpen(true);
  };

  const handleDeleteClick = (product: Product) => {
    setSelectedProduct(product);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      if (selectedProduct) {
        await removeProduct.mutateAsync(selectedProduct.id!);
        toast.success("Product deleted successfully!");
      }
      setDeleteModalOpen(false);
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
      setUpdateModalOpen(false);
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product.");
    }
  };

  const columns: ColumnDef<Product, any>[] = [
    { accessorKey: "name", header: "Product Name" },
    { accessorKey: "description", header: "Description" },
    { accessorKey: "quantity", header: "Quantity" },
    { accessorKey: "price", header: "Price", cell: (info) => `$${info.getValue()}` },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="actions">
          <button className="edit-btn" onClick={() => handleUpdateClick(row.original)}>Edit</button>
          <button className="delete-btn" onClick={() => handleDeleteClick(row.original)}>Delete</button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: products,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="product-table-container">
      <h2>Product List</h2>
      <table className="product-table">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
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
        onClose={() => setUpdateModalOpen(false)}
        onSubmit={handleUpdateSubmit}
        initialData={selectedProduct}
      />

      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default ProductTable;
