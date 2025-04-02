import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import "../../../styles/ProductFormPage.scss";
import { useFetchCategories } from "../../../hooks/useCategoriesQuery";
import {useSavePorduct } from "../../../hooks/useProductsQuery";
type ProductForm = {
  id?: string;
  name: string;
  description?: string;
  imageFile: FileList;
  category: { id: string; name?: string };
  quantity: number;
  price: number;
};

const schema = yup.object().shape({
  id: yup.string().optional(),
  name: yup.string().required("Product name is required"),
  description: yup.string().optional(),
  imageFile: yup
    .mixed<FileList>()
    .test("fileType", "Unsupported file format", (value) =>
      value && value.length > 0
        ? ["image/jpeg", "image/png", "image/gif"].includes(value[0].type)
        : false
    )
    .required("Images are required"),
  category: yup.object({
    id: yup.string().required("Category is required"),
  }),
  quantity: yup
    .number()
    .transform((value, originalValue) =>
      originalValue.trim() === "" ? undefined : value
    )
    .positive("Quantity must be a positive number")
    .integer("Quantity must be an integer")
    .required("Quantity is required"),
  price: yup
    .number()
    .transform((value, originalValue) =>
      originalValue.trim() === "" ? undefined : value
    )
    .positive("Price must be a positive number")
    .required("Price is required"),
});

const ProductFormPage = () => {
  const { data: categories = [] } = useFetchCategories();
  const create = useSavePorduct();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductForm>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: ProductForm) => {
    const selectedCategory = categories.find(
      (cat) => cat.id === data.category.id
    );
    if (!selectedCategory) {
      toast.error("Invalid category selected.");
      return;
    }

    create.mutate(
      {
        id: data.id || "",
        name: data.name,
        description: data.description || "",
        imageFile: data.imageFile,
        category: selectedCategory,
        quantity: data.quantity,
        price: data.price,
      },
      {
        onSuccess: () => {
          reset();
          toast.success("Product added successfully!");
        },
        onError: () => {
          toast.error("Failed to add product.");
        },
      }
    );
  };

  return (
    <div className="product-form-container">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="product-form">
        <label>Product Name</label>
        <input {...register("name")} />
        <p className="error">{errors.name?.message}</p>
        <label>Description</label>
        <textarea {...register("description")} />
        <p className="error">{errors.description?.message}</p>
        <label>Image File</label>
        <div className="file-input-container">
          <input
            type="file"
            {...register("imageFile")}
            className="file-input"
          />
        </div>
        <p className="error">{errors.imageFile?.message}</p>
        <label>Category</label>
        <select {...register("category.id")}>
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        <p className="error">{errors.category?.id?.message}</p>
        <label>Quantity</label>
        <input type="number" {...register("quantity")} />
        <p className="error">{errors.quantity?.message}</p>
        <label>Price</label>
        <input type="number" step="0.01" {...register("price")} />
        <p className="error">{errors.price?.message}</p>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default ProductFormPage;
