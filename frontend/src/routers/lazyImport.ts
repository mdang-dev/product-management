import { lazy } from "react";

export const HomePage = lazy(() => import("../pages/user/HomePage"));
export const LoginPage = lazy(() => import("../pages/user/LoginPage"));
export const SignUpPage = lazy(() => import("../pages/user/SignUpPage"));
export const NotFound = lazy(() => import("../pages/user/NotFound"));

export const CategoriesFormPage = lazy(() => import("../pages/admin/Categories/CategoriesFormPage"));
export const CategoriesListPage = lazy(() => import("../pages/admin/Categories/CategoriesListPage"));
export const ProductFormPage = lazy(() => import("../pages/admin/product/ProductFormPage"));
export const ProductsListPage = lazy(() => import("../pages/admin/product/ProductListPage"));


