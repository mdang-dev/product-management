import { AxiosResponse } from "axios";
import { Category } from "../models";
import {httpClient} from "../api"

const API_URL = "/api/categories";

export const fetchCategories = async () :  Promise<Category[]> => {
	const response = await httpClient.get<Category[]>(API_URL);
    return response.data
}

export const createCategory = async (data: {name: string}):Promise<AxiosResponse> => { 
    const response = await httpClient.post(API_URL, data)
    return response;
}

export const updateCategory = async (data: Category):Promise<AxiosResponse> => {
    const response = await httpClient.put(API_URL, data);
    return response;
}

export const deleteCategory = async (id: string): Promise<AxiosResponse> => {
    const response = await httpClient.delete(`${API_URL}/${id}`)
    return response;
}
