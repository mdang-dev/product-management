import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";

import "../../../styles/ProductListPage.scss";
import { Category } from "../../../model/category.model";
import { Product } from "../../../model/product.model";

const categories: Category[] = [
  { id: "1", name: "Electronics" },
  { id: "2", name: "Clothing" },
  { id: "3", name: "Books" },
];

const initialProducts: Product[] = [
  {
    id: "101",
    name: "Smartphone",
    description: "Latest model with advanced features",
    imageUrl: "undefined",
    category: categories[0],
    quantity: 10,
    price: 699,
    createAt: new Date("2024-03-01"),
  },
  {
    id: "102",
    name: "T-Shirt",
    description: "Cotton t-shirt with stylish design",
    imageUrl: undefined,
    category: categories[1],
    quantity: 50,
    price: 19.99,
    createAt: new Date("2024-03-02"),
  },
  {
    id: "103",
    name: "Programming Book",
    description: "Learn JavaScript from scratch",
    imageUrl: undefined,
    category: categories[2],
    quantity: 30,
    price: 39.99,
    createAt: new Date("2024-03-03"),
  },
];

const ProductTable = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const columns: ColumnDef<Product>[] = [
    { accessorKey: "name", header: "Product Name" },
    { accessorKey: "description", header: "Description" },
    {
      accessorKey: "category",
      header: "Category",
      cell: (info) =>
        categories.find((cat) => cat.id === info.getValue())?.name || "Unknown",
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
          <button className="edit-btn">Edit</button>
          <button
            className="delete-btn"
            onClick={() =>
              setProducts(products.filter((p) => p.id !== row.original.id))
            }
          >
            Delete
          </button>
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

export default ProductTable;
