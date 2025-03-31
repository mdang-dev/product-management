import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import * as tokenStore from "../auth/token.store"


class HttpClient {

    private static instance: HttpClient;
    private api: AxiosInstance;
    private readonly BASE_URL = process.env.url || "";

    private constructor() {

        this.api = axios.create({
            baseURL: this.BASE_URL,
            timeout: 10000,
        });

        this.api.interceptors.request.use(
            (config) => this.handleRequest(config), 
            (error) => this.handleRequestError(error)
        );

        this.api.interceptors.response.use(
            (response) => response, 
            (error) => this.handleResponseError(error)
        );
    }

    static getInstance(): HttpClient {
        if(!HttpClient.instance){
            HttpClient.instance = new HttpClient();
        }
        return HttpClient.instance;
    } 

    private async handleRequest(config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> {

        const publicRoutes = ["/api/auth/login", "/api/auth/register", "/api/public/products"];

        if (publicRoutes.some(route => config.url?.startsWith(route))) {
            return config;
        }

        let token = tokenStore.getToken();
       
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

      return config;

    }

    private handleRequestError = (error: AxiosError): Promise<never> => {
        this.logError(error);
        return Promise.reject(error);
    };

    private async handleResponseError(error: AxiosError): Promise<AxiosError | void> {
        const status = error.response?.status;

        if (status === 401 || status === 403 || status === 500) {
            this.logError(error);
        }

        return Promise.reject(error);
    }

    private logError(error: AxiosError): void {
        console.error("API Error:", error.response?.data || error.message);
    }

    async get<T>(url: string): Promise<AxiosResponse<T>> {
        return this.api.get<T>(url);
    }

    async post<T, D = unknown>(url: string, data?: D): Promise<AxiosResponse<T>> {
        return this.api.post<T>(url, data);
    }

    async put<T, D = unknown>(url: string, data?: D): Promise<AxiosResponse<T>> {
        return this.api.put<T>(url, data);
    }

    async delete<T>(url: string): Promise<AxiosResponse<T>> {
        return this.api.delete<T>(url);
    }
}

export const httpClient = HttpClient.getInstance();
