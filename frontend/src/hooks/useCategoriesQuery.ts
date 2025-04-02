import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { QUERY_KEY } from "../constants/queryKeys"
import { fetchCategories, deleteCategory, updateCategory, createProduct, createCategory } from "../api/index"
import { Category } from "../models/index"
import { useCustomMutation } from "./useCustomMutation"


export const useFetchCategories = () => {
    return useQuery<Category[]>({
        queryKey: [QUERY_KEY.categories],
        queryFn: fetchCategories,
    });
}

export const useSaveCategory = () => {
    return useCustomMutation(
        async (data: {name: string}) => await createCategory(data),
        QUERY_KEY.categories
    );
}

export const useUpdateCategory = () => {
    return useCustomMutation(
       async (data: Category) => await updateCategory(data),
       QUERY_KEY.categories
    );
}

export const useRemoveCategory = () => {
    return useCustomMutation(
       async (id: string) => await deleteCategory(id),
       QUERY_KEY.categories,
    );
}