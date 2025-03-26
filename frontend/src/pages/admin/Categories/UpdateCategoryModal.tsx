import React, { useState } from "react";
import "../../../styles/UpdateCategoryModal.scss";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

type UpdateCategoryModalProps = {
  category: { id: string; name: string };
  onClose: () => void;
  onUpdate: (updatedCategory: { id: string; name: string }) => void;
};

type FormInput = {
  name: string;
}

const schema = yup.object().shape({
  name: yup.string().required("Category name is required"),
});

const UpdateCategoryModal: React.FC<UpdateCategoryModalProps> = ({
  category,
  onClose,
  onUpdate,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({
    resolver: yupResolver(schema),
    defaultValues: category,
  });

  const onSubmit = (data: FormInput) => {
    if (category) {
      onUpdate({ id: category.id, name: data.name });
      onClose();
    }
  };

  return (
    <div className="update-category-modal update-category-modal-transition">
      <div className="update-category-modal-content">
        <h3>Update Category</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>
            Category Name <span className="update-category-required">*</span>
          </label>
          <input
            {...register("name")}
            className="update-category-custom-input"
          />
          <p className="update-category-error"></p>

          <div className="update-category-modal-buttons">
            <button type="submit" className="update-category-save-btn">
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              className="update-category-cancel-btn"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCategoryModal;
