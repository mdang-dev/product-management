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

    const {mutate: create} = useMutation({
         mutationFn: async (data: Product) => {
            
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
        
              createProduct(formData);
        },
        onSuccess: () => {
            toast.success('Product added successfully!');
            queryClient.invalidateQueries({queryKey: [QUERY_KEY.products]})
        },
        onError: () => {
            toast.error('Fail to add product !')
        }
    });

    const {mutate: update} = useMutation({
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

             updateProduct(formData);
           },
        onSuccess: async () => {
            toast.success('Product updated successfully!');
            queryClient.invalidateQueries({queryKey: [QUERY_KEY.products]})
        },
        onError: () => {
            toast.error('Fail to update product !')
        }
    });

    const {mutate: remove} = useMutation({
        mutationFn: (id: string) => deleteProduct(id),
        onSuccess: () => {
            toast.success('Category deleted successfully!');
            queryClient.invalidateQueries({queryKey: [QUERY_KEY.products]})
        },
        onError: () => {
            toast.error('Fail to delete product !')
        }
    });
    
   return { ...fetch, create, update, remove };

}