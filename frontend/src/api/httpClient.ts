import axios, {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import * as tokenStore from "../auth/token.store";

class HttpClient {

    private _baseUrl: string = process.env.url || "";
    private _instance: AxiosInstance;
    private _configs: AxiosRequestConfig = {
        baseURL: this._baseUrl,
        timeout: 10000,
    }

    public get instace() {
        return this._instance;
    }

    constructor () {

        this._instance = axios.create(this._configs);

        this._instance.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
            const token = tokenStore.getToken();
            if(token){
                config.headers.Authorization = `Bearer ${token}`;
            }   
            return config;
        },
        (errr: AxiosError) => {
            return Promise.reject(errr);
        });

        this._instance.interceptors.response.use(
            (response: AxiosResponse) => {
              return response;
              },
              (error: AxiosError) => {
                return Promise.reject(error);
              }
        );

     }
}

export const httpClient = new HttpClient().instace;



