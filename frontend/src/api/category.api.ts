import { AxiosResponse } from "axios";
import { Category } from "../models/category.model";
import {httpClient} from "./index"
import { ResponseError } from "../utils/Errors/ResponseError";

const API_URL = "/api/categories";

export const fetchCategories = async () :  Promise<Category[]> => {
	const response = await httpClient.get<Category[]>('/api/categories');
    if(response.status > 201)
        throw new ResponseError('Fail on fetch categories', response);
    return response.data
}

export const createCategory = async (data: {name: string}):Promise<AxiosResponse> => { 
    return httpClient.post(API_URL, data)
}

export const updateCategory = async (data: Category):Promise<AxiosResponse> => {
    return httpClient.put(API_URL, data);
}

export const deleteCategory = async (id: string): Promise<AxiosResponse> => {
    return httpClient.delete(`${API_URL}/${id}`)
}
