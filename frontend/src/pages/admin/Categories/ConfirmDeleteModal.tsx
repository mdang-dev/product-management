import React from "react";
import "../../../styles/ConfirmDeleteModal.scss";

type ConfirmDeleteModalProps = {
  categoryName: string;
  onClose: () => void;
  onConfirm: () => void;
};

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  categoryName,
  onClose,
  onConfirm,
}) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Confirm Delete</h3>
        <p>Are you sure you want to delete the category "{categoryName}"?</p>
        <div className="modal-actions">
          <button onClick={onConfirm} className="delete-btn">
            Delete
          </button>
          <button onClick={onClose} className="cancel-btn-confirm">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
