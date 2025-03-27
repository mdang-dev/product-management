import { AxiosResponse } from "axios";
import { Category } from "../model/category.model";
import {httpClient} from "./index"

const API_URL = "/api/categories";

export const fetchCategories = async () :  Promise<AxiosResponse<Category[]>> => {
	return httpClient.get<Category[]>(API_URL);
}

export const createCategory = async (data: Category):Promise<AxiosResponse> => {
    return httpClient.post(API_URL, data)
}

export const updateCategory = async (data: Category):Promise<AxiosResponse> => {
    return httpClient.put(API_URL, data);
}

export const deleteCategory = async (id: string): Promise<AxiosResponse> => {
    return httpClient.delete(`${API_URL}/${id}`)
}
