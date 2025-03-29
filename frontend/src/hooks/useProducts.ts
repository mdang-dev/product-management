import { useMutation, useQuery } from "@tanstack/react-query"
import { QUERY_KEY } from "../constants/queryKeys"
import { Product } from "../models/index";
import {fetchProducts, updateProduct, deleteProduct, createProduct} from "../api/index"
import { queryClient } from "../react-query/client";
import { toast } from "react-toastify";

export const useProducts = () => {

 const fetch = useQuery<Product[]>({
        queryKey: [QUERY_KEY.products],
        queryFn: fetchProducts,
        staleTime: 5 * 60 * 1000,
        refetchOnMount: false,
        refetchOnReconnect: true,
        refetchOnWindowFocus: false
    });

    const create = useMutation({
        mutationFn: (data: Product) => createProduct(data),
        onSuccess: () => {
            toast.success('Category added successfully!');
            queryClient.invalidateQueries({queryKey: [QUERY_KEY.categories]})
        },
        onError: () => {
            toast.error('Fail to add category !')
        }
    });

    const update = useMutation({
        mutationFn: (data: Product) => updateProduct(data),
        onSuccess: () => {
            toast.success('Category updated successfully!');
            queryClient.invalidateQueries({queryKey: [QUERY_KEY.categories]})
        },
        onError: () => {
            toast.error('Fail to update category !')
        }
    });

    const remove = useMutation({
        mutationFn: (id: string) => deleteProduct(id),
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