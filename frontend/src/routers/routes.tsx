import { createBrowserRouter } from "react-router-dom";
import {
  CategoriesFormPage,
  CategoriesListPage,
  ProductFormPage,
  ProductsListPage,
  HomePage,
  LoginPage,
  NotFound,
  SignUpPage,
} from "./lazyImport";

import { MainLayout, AdminLayout } from "../layout/index";
import ProtectedRoute from "./ProtectedRoute";
import { ProtectedRouteAuth } from "./ProtectedRouteAuth";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [{ index: true, element: <HomePage /> }],
  },

  {
    path: "/auth",
    children: [
      {
        path: "sign-in",
        element: (
          <ProtectedRouteAuth>
            <LoginPage />
          </ProtectedRouteAuth>
        ),
      },
      {
        path: "sign-up",
        element: (
          <ProtectedRouteAuth>
            <SignUpPage />
          </ProtectedRouteAuth>
        ),
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "categories",
        children: [
          { path: "form", element: <CategoriesFormPage /> },
          { path: "list", element: <CategoriesListPage /> },
        ],
      },
      {
        path: "products",
        children: [
          { path: "form", element: <ProductFormPage /> },
          { path: "list", element: <ProductsListPage /> },
        ],
      },
    ],
  },
]);
