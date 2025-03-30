import { useModal } from "../../hooks/useModal";
import "../../styles/ConfirmModal.scss";

export function ConfirmModal() {
  const { isOpen, title, message, onConfirm, closeModal, type } = useModal();

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2 className="modal-title">{title}</h2>
        <p className="modal-message">{message}</p>
        <div className="modal-buttons">
          <button onClick={closeModal} className="modal-button cancel">
            Cancel
          </button>
          <button
            onClick={() => {
              if (onConfirm) onConfirm();
              closeModal();
            }}
            className={`modal-button confirm ${
              type === "delete" ? "confirm-delete" : "confirm-logout"
            }`}
          >
            {type === "delete" ? "Delete" : "Logout"}
          </button>
        </div>
      </div>
    </div>
  );
}
