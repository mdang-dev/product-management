import { lazy } from "react";

const HomePage = lazy(() => import('./pages/user/HomePage'));
const CategoriesFormPage = lazy(() => import('./pages/admin/categories/CategoriesFormPage'))
const CategoriesListPage = lazy(() => import('./pages/admin/categories/CategoriesListPage'))
const ProductFormPage = lazy(() => import('./pages/admin/product/ProductFormPage'))
const ProductListPage = lazy(() => import('./pages/admin/product/ProductListPage'))

export const routes = [
    {path: '/', element: HomePage}
]

export const routesAdmin = [
    {path: 'categories/form', element: CategoriesFormPage},
    {path: 'categories/list', element: CategoriesListPage},
    {path: 'products/form', element: ProductFormPage},
    {path: 'products/list', element: ProductListPage},
]

