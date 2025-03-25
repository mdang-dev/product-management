import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "../../../styles/UpdateProductModal.scss";

type UpdateProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  initialData: any;
};

const schema = yup.object().shape({
  name: yup.string().required("Product name is required"),
  description: yup.string().optional(),
  quantity: yup
    .number()
    .transform((value, originalValue) =>
      typeof originalValue === "string" && originalValue.trim() === ""
        ? undefined
        : value
    )
    .typeError("Quantity must be a number")
    .positive("Quantity must be a positive number")
    .integer("Quantity must be an integer")
    .required("Quantity is required"),
  price: yup
    .number()
    .transform((value, originalValue) =>
      typeof originalValue === "string" && originalValue.trim() === ""
        ? undefined
        : value
    )
    .typeError("Price must be a number")
    .positive("Price must be a positive number")
    .required("Price is required"),
  imageFile: yup
    .mixed<FileList>()
    .test(
      "fileType",
      "Unsupported file format. Only JPEG, PNG, and GIF are allowed.",
      (value) =>
        !value ||
        value.length === 0 ||
        ["image/jpeg", "image/png", "image/gif"].includes(value[0].type)
    )
    .optional(),
});

const UpdateProductModal: React.FC<UpdateProductModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialData,
  });

  const watchImageFile = watch("imageFile");

  useEffect(() => {
    if (isOpen) {
      reset(initialData);
      setImagePreview(initialData?.imageUrl || null);
    }
  }, [isOpen, initialData, reset]);

  useEffect(() => {
    if (watchImageFile && watchImageFile.length > 0) {
      const file = watchImageFile[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, [watchImageFile]);

  if (!isOpen) return null;

  return (
    <div className="update-modal update-modal-transition">
      <div className="update-modal-content">
        <h3>Update Product</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>
            Product Name <span className="update-required">*</span>
          </label>
          <input {...register("name")} className="update-custom-input" />
          <p className="update-error">
            {typeof errors.name?.message === "string" && errors.name.message}
          </p>

          <label>Description</label>
          <textarea
            {...register("description")}
            className="update-custom-textarea"
          />
          <p className="update-error">
            {typeof errors.description?.message === "string" &&
              errors.description.message}
          </p>

          <label>
            Quantity <span className="update-required">*</span>
          </label>
          <input
            type="number"
            {...register("quantity")}
            className="update-custom-input"
          />
          <p className="update-error">
            {typeof errors.quantity?.message === "string" &&
              errors.quantity.message}
          </p>

          <label>
            Price <span className="update-required">*</span>
          </label>
          <input
            type="number"
            step="0.01"
            {...register("price")}
            className="update-custom-input"
          />
          <p className="update-error">
            {typeof errors.price?.message === "string" && errors.price.message}
          </p>

          <label>Image File</label>
          <input
            type="file"
            {...register("imageFile")}
            className="update-custom-file-input"
          />
          <p className="update-error">
            {typeof errors.imageFile?.message === "string" &&
              errors.imageFile.message}
          </p>

          {imagePreview && (
            <div className="update-image-preview">
              <img src={`${process.env.url}/${imagePreview}`} alt="Preview" />
            </div>
          )}

          <div className="update-modal-buttons">
            <button type="submit" className="update-save-btn">
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              className="update-cancel-btn"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProductModal;
