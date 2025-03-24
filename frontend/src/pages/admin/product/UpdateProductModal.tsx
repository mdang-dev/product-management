import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "../../../styles/Modal.scss";

type UpdateProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  initialData: any;
};

const schema = yup.object().shape({
  name: yup.string().required("Product name is required"),
  description: yup.string().optional(),
  quantity: yup.number().positive().integer().required("Quantity is required"),
  price: yup.number().positive().required("Price is required"),
});

const UpdateProductModal: React.FC<UpdateProductModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialData,
  });

  React.useEffect(() => {
    reset(initialData); // Reset form when initialData changes
  }, [initialData, reset]);

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Update Product</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Product Name</label>
          <input {...register("name")} />
          <p className="error">{typeof errors.name?.message === "string" ? errors.name.message : ""}</p>

          <label>Description</label>
          <textarea {...register("description")} />
          <p className="error">{typeof errors.description?.message === "string" ? errors.description.message : ""}</p>

          <label>Quantity</label>
          <input type="number" {...register("quantity")} />
          <p className="error">{typeof errors.quantity?.message === "string" ? errors.quantity.message : ""}</p>

          <label>Price</label>
          <input type="number" step="0.01" {...register("price")} />
          <p className="error">{typeof errors.price?.message === "string" ? errors.price.message : ""}</p>

          <button type="submit">Save</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProductModal;
