import React, { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

const HomePage = lazy(() => import('./pages/user/HomePage'));
const CategoriesFormPage = lazy(() => import('./pages/admin/Categories/CategoriesFormPage'))
const CategoriesListPage = lazy(() => import('./pages/admin/Categories/CategoriesListPage'))
const ProductFormPage = lazy(() => import('./pages/admin/product/ProductFormPage'))
const ProductListPage = lazy(() => import('./pages/admin/product/ProductListPage'))

export const routes = createBrowserRouter([
{
    path: '/',
    element: React.createElement(HomePage),
}
]);


export const routesAdmin = [
    {path: 'categories/form', element: CategoriesFormPage},
    {path: 'categories/list', element: CategoriesListPage},
    {path: 'products/form', element: ProductFormPage},
    {path: 'products/list', element: ProductListPage},
]

