import React, { lazy } from "react";
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

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [{ index: true, element: <HomePage /> }],
  },

  {
    path: "/auth",
    element: <ProtectedRoute />,
    children: [
      { path: "sign-in", element: <LoginPage /> },
      { path: "sign-up", element: <SignUpPage /> },
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
