import { create } from "zustand";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {httpClient} from "../api/index"
type Category = {
  id: string;
  name: string;
};

type CategoriesStore = {
  selectedCategory: Category | null;
  isUpdateModalOpen: boolean;
  isDeleteModalOpen: boolean;
  setSelectedCategory: (category: Category | null) => void;
  setUpdateModalOpen: (isOpen: boolean) => void;
  setDeleteModalOpen: (isOpen: boolean) => void;
};

export const useCategoriesStore = create<CategoriesStore>((set) => ({
  selectedCategory: null,
  isUpdateModalOpen: false,
  isDeleteModalOpen: false,
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setUpdateModalOpen: (isOpen) => set({ isUpdateModalOpen: isOpen }),
  setDeleteModalOpen: (isOpen) => set({ isDeleteModalOpen: isOpen }),
}));

export const useCategoriesQuery = () => {
  
  const queryClient = useQueryClient();

  const fetchCategories = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: async (): Promise<Category[]> => {
      const response = await httpClient.get("/api/categories");
      return response.data as Category[];
    },
  });

  const addCategory = useMutation({
    mutationFn: async (data: Partial<Category>) => {
      const response = await httpClient.post("/api/categories", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  const updateCategory = useMutation({
    mutationFn: async (updatedCategory: Category) => {
      const response = await httpClient.put(`/api/categories`, updatedCategory);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  const removeCategory = useMutation({
    mutationFn: async (id: string) => {
      await httpClient.delete(`/api/categories/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  return { fetchCategories, addCategory, updateCategory, removeCategory };
};
