import { create } from "zustand";

type Modal = {
    isOpen: boolean;
    title: string;
    message: string;
    type: "delete" | "logout" | "";
    onConfirm: (() => void) | null;
    openModal: (title: string, message: string, type: "delete" | "logout", onConfirm: () => void) => void;
    closeModal: () => void;
}

export const useModal = create<Modal>((set) => ({
    isOpen: false, 
    title: "",
    message: "",
    type: "",
    onConfirm: null,
    openModal: (title, message, type, onConfirm) => set({
        isOpen: true, title, message, type, onConfirm
    }),
    closeModal: () => set({isOpen: false, title: "", message: "", onConfirm: null})
}));