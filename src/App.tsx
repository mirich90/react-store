import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import "./scss/app.scss";
import MainLayout from "./layouts/MainLayout";

const Cart = React.lazy(
  () => import(/* webpackChunkName: "Cart" */ "./pages/Cart")
);
const FullProduct = React.lazy(
  () => import(/* webpackChunkName: "FullProduct" */ "./pages/FullProduct")
);
const NotFound = React.lazy(
  () => import(/* webpackChunkName: "NotFound" */ "./pages/NotFound")
);
//https://65b7b40246324d531d55478c.mockapi.io/products

function App() {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="" element={<Home />} />
          <Route path="cart" element={<Cart />} />
          <Route path="products/:id" element={<FullProduct />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
