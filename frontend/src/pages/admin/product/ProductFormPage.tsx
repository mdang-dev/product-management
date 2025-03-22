import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "../../../styles/ProductFormPage.scss";
import { Category } from "../../../model/category.model";

type ProductForm = {
  id?: string;
  name: string;
  description?: string;
  imageUrl: string;
  imageFile: FileList;
  category: string;
  quantity: number;
  price: number;
  createAt?: Date;
  updateAt?: Date;
};

const categories: Category[] = [
  { id: "1", name: "Electronics" },
  { id: "2", name: "Clothing" },
  { id: "3", name: "Books" },
];

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
  imageUrl: yup.string().required("Image url is required"),
  category: yup.string().required("Category is required"),
  quantity: yup.number().positive().integer().required("Quantity is required"),
  price: yup.number().positive().required("Price is required"),
  createAt: yup.date().optional(),
  updateAt: yup.date().optional(),
});

const ProductForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductForm>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: ProductForm) => {
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

        <label>Image File</label>
        <input {...register("imageFile")} />
        <p className="error">{errors.imageUrl?.message}</p>

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
