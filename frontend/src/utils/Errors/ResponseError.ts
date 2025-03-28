import { AxiosError, AxiosResponse } from "axios";

export class ResponseError extends AxiosError {
    constructor(message: string, public response: AxiosResponse){
        super(message);
    }
}