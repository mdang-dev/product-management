import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import * as tokenStore from "../auth/token.store";

class HttpClient {

    private api: AxiosInstance;
    private _BASE_URL = process.env.url || "";

    constructor() {

        this.api = axios.create({
            baseURL: this._BASE_URL,
            timeout: 10000,
        });

        this.api.interceptors.request.use(async config => {
            const token = tokenStore.getToken();
            if(token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
          }, 
         err => Promise.reject(err)
        );

        this.api.interceptors.response.use(
            (response) => {
                return response
            }, 
            err => Promise.reject(err)
        );
    }

    public get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.api.get(url, config);
    }

    public post<T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.api.post(url, data, config);
    }

    public put<T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>{
        return this.api.put(url, data, config);
    }

    public delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>{
        return this.api.delete(url, config);
    }
}


export const httpClient = new HttpClient();
