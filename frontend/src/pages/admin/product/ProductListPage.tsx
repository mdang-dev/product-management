import { useState, useMemo, useCallback, useEffect } from "react";
import { ColumnDef } from "@tanstack/react-table";
import "../../../styles/ProductListPage.scss";
import { Product } from "../../../models/product.model";
import UpdateProductModal from "./UpdateProductModal";
import { ArrowUpDown } from "lucide-react";
import {
  useFetchProducts,
  useRemoveProduct,
  useUpdateProduct,
} from "../../../hooks/useProductsQuery";
import { useModal } from "../../../hooks/useModal";
import { toast } from "react-toastify";
import { GlobalTable } from "../../../components/table/GlobalTable";

const ProductListPage = () => {
  const openModal = useModal((set) => set.openModal);
  const { data: products = [] } = useFetchProducts();
  const remove = useRemoveProduct();
  const update = useUpdateProduct();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isLoading, setIdLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIdLoading(false);
    }, 10000);
  }, []);

  const filteredProducts = useMemo(
    () =>
      products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [products, searchTerm]
  );

  const handleUpdateClick = useCallback((product: Product) => {
    setSelectedProduct(product);
  }, []);

  const handleDeleteClick = useCallback((product: Product) => {
    if (product) {
      openModal(
        "Confirm Deletion",
        "Are you sure you want to delete this item?",
        "delete",
        () =>
          remove.mutate(product.id, {
            onSuccess: () => {
              toast.success("Product deleted successfully");
            },
            onError: () => {
              toast.error("Failed to delete product");
            },
          })
      );
    }
  }, []);

  const handleUpdateSubmit = (data: Product) => {
    update.mutate(data, {
      onSuccess: () => {
        toast.success("Product updated successfully");
        setSelectedProduct(null);
      },
      onError: () => {
        toast.error("Failed to update product");
      },
    });
  };

  const columns = useMemo<ColumnDef<Product>[]>(
    () => [
      { accessorKey: "id", header: "Product ID", enableSorting: false },
      {
        accessorKey: "name",
        header: "Product Name",
        sortingFn: "alphanumeric",
        filterFn: "includesString",
      },
      {
        accessorKey: "description",
        header: "Description",
        enableSorting: false,
      },
      {
        accessorKey: "imageUrl",
        header: "Image",
        enableSorting: false,
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
      { accessorKey: "quantity", header: "Quantity", sortingFn: "basic" },
      {
        accessorKey: "price",
        sortingFn: "basic",
        header: "Price",
        cell: (info) => `$${info.getValue()}`,
      },
    ],
    []
  );

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

      <GlobalTable
        columns={columns}
        data={filteredProducts}
        loading={isLoading}
        handleDeleteClick={handleDeleteClick}
        handleUpdateClick={handleUpdateClick}
      />

      {selectedProduct && (
        <UpdateProductModal
          product={selectedProduct}
          onClose={() => {
            setSelectedProduct(null);
          }}
          onUpdate={handleUpdateSubmit}
        />
      )}
    </div>
  );
};

export default ProductListPage;
