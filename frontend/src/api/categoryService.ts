import { AxiosResponse } from "axios";
import { Category } from "../model/category.model";
import ApiService from "./apiService";

const API_URL = "/api/categories";

export const getCategories = async () :  Promise<AxiosResponse<Category[]>> => {
	return ApiService.get<Category[]>(API_URL);
}

export const createCategory = async (data: Category):Promise<AxiosResponse> => {
    return ApiService.post(API_URL, data)
}

export const updateCategory = async (data: Category):Promise<AxiosResponse> => {
    return ApiService.put(API_URL, data);
}

export const deleteCategory = async (id: string): Promise<AxiosResponse> => {
    return ApiService.delete(`${API_URL}/${id}`)
}
