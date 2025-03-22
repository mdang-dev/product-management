import React, { useState } from "react";
import "../../../styles/UpdateCategoryModal.scss";

type UpdateCategoryModalProps = {
  category: { id: string; name: string };
  onClose: () => void;
  onUpdate: (updatedCategory: { id: string; name: string }) => void;
};

const UpdateCategoryModal: React.FC<UpdateCategoryModalProps> = ({
  category,
  onClose,
  onUpdate,
}) => {
  const [name, setName] = useState(category.name);

  const handleSubmit = () => {
    if (name.trim()) {
      onUpdate({ id: category.id, name });
      onClose();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Update Category</h3>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter new category name"
        />
        <div className="modal-actions">
          <button onClick={handleSubmit} className="save-btn">
            Save
          </button>
          <button onClick={onClose} className="cancel-btn">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateCategoryModal;
