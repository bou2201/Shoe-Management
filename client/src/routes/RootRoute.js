import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import {
  ErrorPage,
  Login,
  Register,
  Layout,
  Dashboard,
  Product,
  Details,
  Order,
  History,
  Cart,
  Create,
  Update,
  SearchResult,
} from "../components";
import PrivateRoute from "./PrivateRoute";

const RootRoute = () => {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<ErrorPage />} />
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Layout />}>
            <Route path="" element={<Dashboard />} />
            <Route path="register" element={<Register />} />
            <Route path="product" element={<Product />} />
            <Route path="product/:id" element={<Details />} />
            <Route path="product/create" element={<Create />} />
            <Route path="product/update/:id" element={<Update />} />
            <Route
              path="product/search"
              element={<SearchResult itemsPerPage={8} />}
            />
            <Route path="orders" element={<Order />} />
            <Route path="history" element={<History />} />
            <Route path="cart" element={<Cart />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default RootRoute;
