import {httpClient} from "./index"
import { Product } from "../models/product.model"
import { ResponseError } from "../utils/Errors/ResponseError"

const API_URL = "/api/products"

export const fetchProducts = async (): Promise<Product[]> => {
    const response = await httpClient.get<Product[]>(API_URL);
    if(response.status > 201)
        throw new ResponseError('Fail on fetch products request', response);
    return response.data;
}

export const fetchProductsPublic = async (): Promise<Product[]> => {
    const response = await httpClient.get<Product[]>("/api/public/products");
    if(response.status > 201)
        throw new ResponseError('Fail on fetch products request', response);
    return response.data;
}

export const createProduct = async (data: FormData) => {
   return httpClient.post(API_URL, data); 
}

export const updateProduct  = async (data: FormData) => {
    return httpClient.put(API_URL, data);
}

export const deleteProduct = async (id: string) => {
    return httpClient.delete(`${API_URL}/${id}`);
}