import {httpClient} from "./index"
import { Product } from "../models"
import { AxiosResponse } from "axios"
import { API_KEY } from "../constants/apiKeys"


export const fetchProducts = async (): Promise<Product[]> => {
    const response = await httpClient<Product[]>(API_KEY.products);
    return response.data
}

export const fetchProductsPublic = async (): Promise<Product[]> => {
    const response = await httpClient.get<Product[]>(API_KEY.public.products);
    return response.data;
}

export const createProduct = async (data: FormData): Promise<AxiosResponse> => {
   const response = await httpClient.post(API_KEY.products, data); 
   return response;
}

export const updateProduct  = async (data: FormData): Promise<AxiosResponse> => {
    const response  = await httpClient.put(API_KEY.products, data);
    return response;
}

export const deleteProduct = async (id: string): Promise<AxiosResponse> => {
    const response = await httpClient.delete(`${API_KEY.products}/${id}`);
    return response;
}
