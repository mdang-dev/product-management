import {httpClient} from "./index"
import { Product } from "../models"
import { ResponseError } from "../utils/Errors/ResponseError"
import { AxiosResponse } from "axios"

const API_URL = "/api/products"

export const fetchProducts = async (): Promise<Product[]> => {
    const response = await httpClient.get<Product[]>(API_URL);
    checkResponse(response)
    return response.data;
}

export const fetchProductsPublic = async (): Promise<Product[]> => {
    const response = await httpClient.get<Product[]>("/api/public/products");
    checkResponse(response);
    return response.data;
}

export const createProduct = async (data: FormData): Promise<AxiosResponse> => {
   const response = await httpClient.post(API_URL, data); 
   checkResponse(response);
   return response;
}

export const updateProduct  = async (data: FormData): Promise<AxiosResponse> => {
    const response  = await httpClient.put(API_URL, data);
    checkResponse(response);
    return response;
}

export const deleteProduct = async (id: string): Promise<AxiosResponse> => {
    const response = await httpClient.delete(`${API_URL}/${id}`);
    checkResponse(response);
    return response;
}

const checkResponse = (response: AxiosResponse) => {
    if(response.status > 201){
        throw new ResponseError('Fail on api products request', response);
    }
}