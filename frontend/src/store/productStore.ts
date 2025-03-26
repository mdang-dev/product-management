import { create } from "zustand";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/api";
import { Product } from "../model/product.model";

type ProductStore = {
  selectedProduct: Product | null;
  isUpdateModalOpen: boolean;
  isDeleteModalOpen: boolean;
  setSelectedProduct: (product: Product | null) => void;
  setUpdateModalOpen: (isOpen: boolean) => void;
  setDeleteModalOpen: (isOpen: boolean) => void;
};

export const useProductStore = create<ProductStore>((set) => ({
  selectedProduct: null,
  isUpdateModalOpen: false,
  isDeleteModalOpen: false,
  setSelectedProduct: (product) => set({ selectedProduct: product }),
  setUpdateModalOpen: (isOpen) => set({ isUpdateModalOpen: isOpen }),
  setDeleteModalOpen: (isOpen) => set({ isDeleteModalOpen: isOpen }),
}));

export const useProductsQuery = () => {
  
  const queryClient = useQueryClient();

  const fetchProducts = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await api.get("/api/products");
      return response.data;
    },
  });

  const addProduct = useMutation({
    mutationFn: async (data: Partial<Product>) => {
      const formData = new FormData();

      const productJson = JSON.stringify({
        name: data.name,
        description: data.description || "",
        category: data.category,
        quantity: data.quantity,
        price: data.price,
      });

      formData.append("product", productJson);
      if (data.imageFile) {
        formData.append("imageFile", data.imageFile[0]);
      }

      const response = await api.post("/api/products", formData);

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const updateProduct = useMutation({
    mutationFn: async (data: Product) => {
      const formData = new FormData();

      const productJson = JSON.stringify({
        id: data.id,
        name: data.name,
        description: data.description || "",
        category: data.category,
        quantity: data.quantity,
        price: data.price,
      });

      formData.append("product", productJson);
      if (data.imageFile) {
        formData.append("imageFile", data.imageFile[0]);
      }

      const response = await api.put(`/api/products`, formData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const removeProduct = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/api/products/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  return { fetchProducts, addProduct, updateProduct, removeProduct };
};
