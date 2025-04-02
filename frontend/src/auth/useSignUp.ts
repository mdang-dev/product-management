import {AxiosResponse } from "axios";
import { httpClient } from "../api";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

async function signUp(data: {username: string, password: string}): Promise<AxiosResponse> {
    const response = await httpClient.post('/api/auth/register', data);
    return response;
}

export function useSignUp() {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: signUp,
        onSuccess: () => {
            toast.success('Register successfully !');
            navigate('/auth/sign-in');
        },
        onError: () => {
            toast.error("Username or password already exists !");
        }
    });
}