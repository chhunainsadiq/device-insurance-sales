import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import AppLayout from "../components/AppLayout";
import defaultTheme from "../services/themes";
import { applicationRoutes } from "../services/general/constants";
import ProductInsurance from "./ProductInsurance";
const NotFound = lazy(() => import("./NotFound"));


function Router() {

  const renderRoute = (path, component) => {
    return (
      <Route exact path={path} element={<Suspense fallback={<div>Loading...</div>}>{component}</Suspense>} />
    );
  };

  const renderRoutes = () => {
    return (
      <BrowserRouter>
        <AppLayout>
          <Routes>
            {renderRoute(applicationRoutes.root, <ProductInsurance />)}
            {renderRoute("*", <NotFound />)}
          </Routes>
        </AppLayout>
      </BrowserRouter>
    );
  };

  return (
    <ThemeProvider theme={{ ...defaultTheme }}>
      {renderRoutes()}
    </ThemeProvider>
  );
}

export default Router;
