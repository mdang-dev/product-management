import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "../../../styles/ProductFormPage.scss";
import { Category } from "../../../model/category.model";

export type Product = {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  category: string;
  quantity: number;
  price: number;
  createAt: string;
  updateAt?: string;
};

const categories: Category[] = [
  { id: "1", name: "Electronics" },
  { id: "2", name: "Clothing" },
  { id: "3", name: "Books" },
];

const schema = yup.object().shape({
  name: yup.string().required("Product name is required"),
  description: yup.string().required("Description is required"),
  imageUrl: yup.string().url("Must be a valid URL").optional(),
  category: yup.string().required("Category is required"),
  quantity: yup.number().positive().integer().required("Quantity is required"),
  price: yup.number().positive().required("Price is required"),
});

const ProductForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Product>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: Product) => {
    console.log("Product Data:", data);
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

        <label>Image URL</label>
        <input {...register("imageUrl")} />
        <p className="error">{errors.imageUrl?.message}</p>

        <label>Category</label>
        <select {...register("category")}>
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        <p className="error">{errors.category?.message}</p>

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

export default ProductForm;
