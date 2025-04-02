import { useQuery } from "@tanstack/react-query"
import { QUERY_KEY } from "../constants/queryKeys"
import { Product } from "../models/index";
import {fetchProducts, updateProduct, deleteProduct, createProduct} from "../api/index"
import { useCustomMutation } from "./useCustomMutation";


export const useFetchProducts = () => {
    return useQuery<Product[]>({
        queryKey: [QUERY_KEY.products],
        queryFn: fetchProducts,
    });
}

export const useSavePorduct = () => {
  return useCustomMutation(
     async (data: Product) => {
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

      await createProduct(formData);
    },
    [QUERY_KEY.products]
   );
};

export const useUpdateProduct = () => {
    return useCustomMutation(
      async (data: Product) => {
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

       await updateProduct(formData);
      },
      [QUERY_KEY.products]
     );
}


export const useRemoveProduct = () => {
  return useCustomMutation(
    async (id: string) => await deleteProduct(id),
    [QUERY_KEY.products]
  );
}