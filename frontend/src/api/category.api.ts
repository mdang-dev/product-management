import { AxiosResponse } from "axios";
import { Category } from "../models";
import {httpClient} from "../api"
import { ResponseError } from "../utils/Errors/ResponseError";

const API_URL = "/api/categories";

export const fetchCategories = async () :  Promise<Category[]> => {
	const response = await httpClient.get<Category[]>('/api/categories');
    checkResponse(response)
    return response.data
}

export const createCategory = async (data: {name: string}):Promise<AxiosResponse> => { 
    const response = await httpClient.post(API_URL, data)
    checkResponse(response)
    return response;
}

export const updateCategory = async (data: Category):Promise<AxiosResponse> => {
    const response = await httpClient.put(API_URL, data);
    checkResponse(response)
    return response;
}

export const deleteCategory = async (id: string): Promise<AxiosResponse> => {
    const response = await httpClient.delete(`${API_URL}/${id}`)
    checkResponse(response)
    return response;
}

const checkResponse = (response: AxiosResponse) => {
    if(response.status > 201)
        throw new ResponseError('Fail on api categories request', response);
}