import { lazy } from "react";

const HomePage = lazy(() => import('./pages/user/HomePage'));
const CategoriesFormPage = lazy(() => import('./pages/admin/Categories/CategoriesFormPage'))

export const routes = [
    {path: '/', element: HomePage}
]

export const routesAdmin = [
    {path: 'categories/form', element: CategoriesFormPage}
]

