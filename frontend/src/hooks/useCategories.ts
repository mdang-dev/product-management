import { useMutation, useQuery } from "@tanstack/react-query"
import { QUERY_KEY } from "../constants/queryKeys"
import { fetchCategories, deleteCategory, updateCategory, createProduct, createCategory } from "../api/index"
import { Category } from "../models/index"
import { queryClient } from "../react-query/client"
import { toast } from "react-toastify"

export const useCategories = () => {

    const fetch = useQuery<Category[]>({
        queryKey: [QUERY_KEY.categories],
        queryFn: fetchCategories,
        staleTime: 5 * 60 * 1000,
        refetchOnMount: false,
        refetchOnReconnect: true,
        refetchOnWindowFocus: false
    });

    const {mutate: create} = useMutation({
        mutationFn:async (data: {name: string}) => await createCategory(data),
        onSuccess: () => {
            toast.success('Category added successfully!');
            queryClient.invalidateQueries({queryKey: [QUERY_KEY.categories]})
        },
        onError: () => {
            toast.error('Fail to add category !')
        }
    });

    const {mutate: update} = useMutation({
        mutationFn: async (data: Category) => await updateCategory(data),
        onSuccess: () => {
            toast.success('Category updated successfully!');
            queryClient.invalidateQueries({queryKey: [QUERY_KEY.categories]})
        },
        onError: () => {
            toast.error('Fail to update category !')
        }
    });

    const {mutate: remove} = useMutation({
        mutationFn: async (id: string) => await deleteCategory(id),
        onSuccess: () => {
            toast.success('Category deleted successfully!');
            queryClient.invalidateQueries({queryKey: [QUERY_KEY.categories]})
        },
        onError: () => {
            toast.error('Fail to delete category !')
        }
    });
    
   return { ...fetch, create, update, remove };
}