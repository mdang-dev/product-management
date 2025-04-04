import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signUp } from "../api/user.api";

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