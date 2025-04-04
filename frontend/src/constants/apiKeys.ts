import { signOut } from "../api/user.api";

export const API_KEY =  {
    user: '/api/users/my-info',
    products: '/api/products',
    public: {
        products: '/api/public/products'
    },
    categories: '/api/categories',
    auth: {
        signIn: '/api/auth/login',
        signUp: '/api/auth/register',
        signOut: '/users/logout'
    }
}