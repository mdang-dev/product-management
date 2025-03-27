import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

class ApiService {

    private api: AxiosInstance;

    constructor() {
        this.api = axios.create({
            baseURL: process.env.url,
            timeout: 10000
        });
        this.api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
            const token = Cookies.get('token');
            if (token) {
                config.headers = config.headers || {};
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        });
    }

    async get<T>(url: string, config: AxiosRequestConfig = {}): Promise<AxiosResponse<T>> {
        return this.api.get<T>(url, config);
    }

    async post<T>(url: string, params: Record<string, any> = {}, config: AxiosRequestConfig = {}): Promise<AxiosResponse<T>> {
        return this.api.post<T>(url, params, config);
    }

    async put<T>(url: string, params: Record<string, any> = {}, config: AxiosRequestConfig = {}): Promise<AxiosResponse<T>> {
        return this.api.put<T>(url, params, config);
    }

    async delete<T>(url: string, config: AxiosRequestConfig = {}): Promise<AxiosResponse<T>> {
        return this.api.post<T>(url, config);
    }

}

export default new ApiService();