import React, { useRef, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import "../../../styles/ProductFormPage.scss";
import { useFetchCategories } from "../../../hooks/useCategoriesQuery";
import { useSavePorduct } from "../../../hooks/useProductsQuery";
import {
  Input,
  ErrorText,
  Button,
  InputGroup,
  Label,
} from "../../../components/ui/index";

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
        : true
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
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const form = useForm<ProductForm>({
    resolver: yupResolver(schema),
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files;
    if (file) {
      form.setValue("imageFile", file);
      form.trigger("imageFile");
      setImagePreview(URL.createObjectURL(file?.[0]));
    }
  };

  const removeImage = () => {
    if (inputRef.current && imagePreview) {
      setImagePreview(null);
      inputRef.current.value = "";
      form.reset({ ...form.getValues(), imageFile: undefined });
      form.trigger("imageFile");
    }
  };

  const onSubmit = async (data: ProductForm) => {
    const selectedCategory = categories.find(
      (cat) => cat.id === data.category.id
    );

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
          form.reset();
          setImagePreview(null);
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
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="product-form">
          <Controller
            control={form.control}
            name="name"
            render={({ field, fieldState }) => (
              <InputGroup>
                <Label>Product Name</Label>
                <Input {...field} />
                <ErrorText>{fieldState.error?.message}</ErrorText>
              </InputGroup>
            )}
          />
          <label>Description</label>
          <textarea {...form.register("description")} />
          <p className="error">{form.formState.errors.description?.message}</p>
          <Controller
            control={form.control}
            name="imageFile"
            render={({ field, fieldState }) => (
              <div className="file-input-container">
                <InputGroup>
                  <Label>Product Name</Label>
                  <Input
                    type="file"
                    name={field.name}
                    ref={inputRef}
                    onChange={handleFileChange}
                  />
                </InputGroup>
                {imagePreview && (
                  <div className="image-preview">
                    <img src={imagePreview} alt="Preview" />
                    <button
                      type="button"
                      className="remove"
                      onClick={removeImage}
                    >
                      ✕
                    </button>
                  </div>
                )}
                <ErrorText>{fieldState.error?.message}</ErrorText>
              </div>
            )}
          />
          <label>Category</label>
          <select {...form.register("category.id")}>
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          <p className="error">{form.formState.errors.category?.id?.message}</p>
          <Controller
            control={form.control}
            name="quantity"
            render={({ field, fieldState }) => (
              <InputGroup>
                <Label>Quantity</Label>
                <Input {...field} />
                <ErrorText>{fieldState.error?.message}</ErrorText>
              </InputGroup>
            )}
          />
          <Controller
            control={form.control}
            name="price"
            render={({ field, fieldState }) => (
              <InputGroup>
                <Label>Price</Label>
                <Input type="number" step="0.01" {...field} />
                <ErrorText>{fieldState.error?.message}</ErrorText>
              </InputGroup>
            )}
          />
          <Button type="submit" style={{ marginTop: "20px" }}>
            Add Product
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default ProductFormPage;
