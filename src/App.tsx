import { Suspense } from "react";
import "./global.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import routes from "./routes";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Layout />}>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={<route.element />}
              />
            ))}
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
