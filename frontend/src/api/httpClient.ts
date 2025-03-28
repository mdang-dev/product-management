import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import * as tokenStore from "../auth/token.store"


class HttpClient {

    private static instance: HttpClient;
    private api: AxiosInstance;
    private isRefreshing = false;
    private refreshSubscribers: ((token: string) => void)[] = [];
    private readonly SESSION_TIMEOUT = 24 * 60 * 60 * 1000;
    private readonly BASE_URL = process.env.URL || "";

    private constructor() {
        this.api = axios.create({
            baseURL: this.BASE_URL,
            timeout: 10000,
        });

        this.api.interceptors.request.use(this.handleRequest, this.handleRequestError);
        this.api.interceptors.response.use((response) => response, this.handleResponseError);
    }

    static getInstance(): HttpClient {
        if(!HttpClient.instance){
            HttpClient.instance = new HttpClient();
        }
        return HttpClient.instance;
    } 

    private async handleRequest(config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> {

       let token = tokenStore.getToken();

       if(!token || tokenStore.isSessionExpired(this.SESSION_TIMEOUT)){
          try {
            token = await this.refreshToken();
          } catch (error) {
            this.forceLogout();
          }
       }

       if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;

    }

    private handleRequestError = (error: AxiosError): Promise<never> => {
        console.error("Request Error:", error);
        return Promise.reject(error);
    };

    private async handleResponseError(error: AxiosError): Promise<AxiosError | void> {
        const status = error.response?.status;

        if (status === 401 || status === 403) {
            this.forceLogout();
        }

        if (status === 500) {
            this.logError(error);
        }

        return Promise.reject(error);
    }

    private async refreshToken(): Promise<string> {
        if (this.isRefreshing) {
            return new Promise((resolve) => this.refreshSubscribers.push(resolve));
        }

        this.isRefreshing = true;

        try {
            const response = await this.get<{ token: string }>("/users/refresh");
            const newToken = response.data.token;

            tokenStore.setToken(newToken);
            this.api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;

            this.refreshSubscribers.forEach((callback) => callback(newToken));
            this.refreshSubscribers = [];

            return newToken;
        } catch (error) {
            this.forceLogout();
            throw error;
        } finally {
            this.isRefreshing = false;
        }
    }

    private forceLogout(): void {
        tokenStore.clearToken();
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
