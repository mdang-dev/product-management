import { AxiosPromise } from "axios"
import {httpClient} from "./index"
import { Product } from "../models/product.model"

const API_URL = "/api/products"

export const fetchProducts = async (): Promise<AxiosPromise<Product[]>> => {
    return httpClient.get(API_URL);
}

export const createProduct = async (data: Product) => {
   return httpClient.post(API_URL, data); 
}

export const updateProduct  = async (data: Product) => {
    return httpClient.put(API_URL, data);
}

export const deleteProduct = async (id: string) => {
    return httpClient.delete(`${API_URL}/${id}`);
}