import { AxiosResponse } from "axios";
import { Category } from "../models";
import {httpClient} from "../api"
import { API_KEY } from "../constants/apiKeys";

export const fetchCategories = async () :  Promise<Category[]> => {
	const response = await httpClient.get<Category[]>(API_KEY.categories);
    return response.data
}

export const createCategory = async (data: {name: string}):Promise<AxiosResponse> => { 
    const response = await httpClient.post(API_KEY.categories, data)
    return response;
}

export const updateCategory = async (data: Category):Promise<AxiosResponse> => {
    const response = await httpClient.put(API_KEY.categories, data);
    return response;
}

export const deleteCategory = async (id: string): Promise<AxiosResponse> => {
    const response = await httpClient.delete(`${API_KEY.categories}/${id}`)
    return response;
}
