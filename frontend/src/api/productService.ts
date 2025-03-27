import { AxiosPromise } from "axios"
import ApiService from "./apiService"
import { Product } from "../model/product.model"

const API_URL = "/api/products"

export const getProducts = async (): Promise<AxiosPromise<Product[]>> => {
    return ApiService.get(API_URL);
}

export const createProduct = async (data: Product) => {
   return ApiService.post(API_URL, data); 
}

export const updateProduct  = async (data: Product) => {
    return ApiService.put(API_URL, data);
}

export const deleteProduct = async (id: string) => {
    return ApiService.delete(`${API_URL}/${id}`);
}