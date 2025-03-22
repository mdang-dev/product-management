import { Suspense, lazy } from "react";
import "./styles/Global.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LayoutRoot from "./layout/user/Layout";
import LayoutAdmin from "./layout/admin/Layout";
import { routes } from "./routes";
import { routesAdmin } from "./routes";
import NotFound from "./pages/user/NotFound";
import AuthProvider from "./provider/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const LoginPage = lazy(() => import("./pages/user/LoginPage"));
const SignUp = lazy(() => import("./pages/user/SignUpPage"));

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<LayoutRoot />}>
                {routes.map((route, index) => (
                  <Route
                    key={index}
                    path={route.path}
                    element={<route.element />}
                  />
                ))}
              </Route>
              <Route path="/admin/*" element={<LayoutAdmin />}>
                {routesAdmin.map((route, index) => (
                  <Route
                    key={index}
                    path={route.path}
                    element={<route.element />}
                  />
                ))}
              </Route>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
